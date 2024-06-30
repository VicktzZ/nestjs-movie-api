import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // ADD RANDOM USER TO DATABASE
  @HttpCode(201)
  async addRandom(): Promise<User> {
    const dto: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password({ length: 8 }), 12),
      role: 'user',
    };

    const user = this.usersRepo.create(dto);
    await this.usersRepo.save(user);

    return user;
  }

  // CRUD
  @HttpCode(201)
  async signup(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = this.usersRepo.create({ ...dto, password: hashedPassword });
    await this.usersRepo.save(user);

    return user;
  }

  @HttpCode(200)
  findAll(): Promise<User[]> {
    const users = this.usersRepo.find();

    return users;
  }

  @HttpCode(200)
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found!');

    return user;
  }

  @HttpCode(200)
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) throw new BadRequestException('User not found!');

    return user;
  }

  @HttpCode(202)
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepo.update(id, dto);
    if (!user) throw new BadRequestException('User not found!');

    return await this.usersRepo.findOneBy({ id });
  }

  @HttpCode(204)
  async remove(id: string): Promise<void | Record<'message', string>> {
    const user = await this.usersRepo.delete(id);
    if (!user) throw new BadRequestException('User not found!');
  }
}
