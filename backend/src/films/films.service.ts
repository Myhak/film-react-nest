import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { FilmDto, ScheduleDto, FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';
import { FilmDocument } from './schemas/film.schema';
import { Schedule } from './schemas/schedule.schema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  private convertFilmToDto(film: FilmDocument): FilmDto {
    return {
      id: film._id.toString(),
      title: film.title,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }

  private convertScheduleToDto(schedule: Schedule, filmId: string): ScheduleDto {
    return {
      id: schedule._id.toString(),
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
      items: films.map(film => this.convertFilmToDto(film)),
    };
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleResponseDto> {
    const schedule = await this.filmsRepository.findScheduleByFilmId(filmId);
    
    if (schedule === null) {
      throw new NotFoundException(`Film with id ${filmId} not found`);
    }

    return {
      total: schedule.length,
      items: schedule.map(s => this.convertScheduleToDto(s, filmId)),
    };
  }
}
