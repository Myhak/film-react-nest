import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import {
  FilmDto,
  ScheduleDto,
  FilmsResponseDto,
  ScheduleResponseDto,
} from './dto/films.dto';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  private convertFilmToDto(film: Film): FilmDto {
    return {
      id: film.id,
      title: film.title,
      rating: film.rating ? Number(film.rating) : undefined,
      director: film.director,
      tags: film.tags,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }

  private convertScheduleToDto(schedule: Schedule): ScheduleDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime.toISOString(),
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }

  async findAll(): Promise<FilmsResponseDto> {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films.map((film) => this.convertFilmToDto(film)),
    };
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleResponseDto> {
    const schedule = await this.filmsRepository.findScheduleByFilmId(filmId);

    if (schedule === null) {
      throw new NotFoundException(`Film with id ${filmId} not found`);
    }

    return {
      total: schedule.length,
      items: schedule.map((s) => this.convertScheduleToDto(s)),
    };
  }
}
