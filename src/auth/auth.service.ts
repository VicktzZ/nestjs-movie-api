import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.jwtService.sign({
        email: user.email,
        id: user.id,
        role: user.role,
      });
    }

    return null;
  }
}
