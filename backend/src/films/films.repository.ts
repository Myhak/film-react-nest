import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({ where: { id } });
  }

  async findScheduleByFilmId(filmId: string): Promise<Schedule[] | null> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedules'],
    });
    return film?.schedules || null;
  }

  async findScheduleById(
    filmId: string,
    scheduleId: string,
  ): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({
      where: { id: scheduleId, filmId },
    });
  }

  async addTakenSeats(
    filmId: string,
    scheduleId: string,
    seats: string[],
  ): Promise<boolean> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId, filmId },
    });

    if (!schedule) {
      return false;
    }

    // Проверяем, что места не заняты
    for (const seat of seats) {
      if (schedule.taken.includes(seat)) {
        return false; // Место уже занято
      }
    }

    // Добавляем занятые места
    schedule.taken = [...schedule.taken, ...seats];
    await this.scheduleRepository.save(schedule);

    return true;
  }

  async create(filmData: Partial<Film>): Promise<Film> {
    const film = this.filmRepository.create(filmData);
    return this.filmRepository.save(film);
  }
}
