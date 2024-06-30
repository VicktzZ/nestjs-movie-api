import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsDateString()
  year: string;

  @ApiProperty()
  @IsString()
  director: string;
}
