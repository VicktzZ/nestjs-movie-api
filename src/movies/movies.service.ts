import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { capitalize } from '../utils';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepo: Repository<Movie>,
  ) {}

  // ADD RANDOM MOVIE TO DATABASE
  @HttpCode(201)
  async addRandom(): Promise<Movie> {
    const gender = [
      'Action',
      'Romance',
      'Comedy',
      'Adventure',
      'Drama',
      'Horror',
      'Mystery',
      'Thriller',
    ][faker.number.int({ min: 0, max: 7 })];

    const dto: CreateMovieDto = {
      title: `${capitalize(faker.hacker.ingverb())}: The ${capitalize(faker.company.buzzNoun())}`,
      gender,
      director: faker.person.fullName(),
      year: faker.date
        .birthdate({ min: 1920, max: 2024, mode: 'year' })
        .toISOString()
        .split('T')[0]
        .replace(/-/g, '-'),
    };

    const movie = this.moviesRepo.create(dto);
    await this.moviesRepo.save(movie);

    return movie;
  }

  // CRUD
  @HttpCode(201)
  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepo.create(dto);
    await this.moviesRepo.save(movie);

    return movie;
  }

  @HttpCode(200)
  findAll(): Promise<Movie[]> {
    const movies = this.moviesRepo.find();

    return movies;
  }

  @HttpCode(200)
  async findOne(id: string): Promise<Movie> {
    const movie = await this.moviesRepo.findOneBy({ id });
    if (!movie) throw new BadRequestException('Movie not found!');

    return movie;
  }

  @HttpCode(202)
  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepo.update(id, dto);
    if (!movie) throw new BadRequestException('Movie not found!');

    return await this.moviesRepo.findOneBy({ id });
  }

  @HttpCode(204)
  async remove(id: string): Promise<void> {
    const movie = await this.moviesRepo.delete(id);
    if (!movie) throw new BadRequestException('Movie not found!');
  }
}
