import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilmDto {
  @IsString()
  id: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  director?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  cover?: string;
}

export class ScheduleDto {
  @IsString()
  id: string;

  @IsDateString()
  daytime: string;

  @IsString()
  hall: string;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  taken?: string[];
}

export class FilmWithScheduleDto {
  @IsString()
  id: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  director?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule?: ScheduleDto[];
}

export class FilmsResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilmDto)
  items: FilmDto[];
}

export class ScheduleResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  items: ScheduleDto[];
}
