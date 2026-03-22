import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FilmDocument } from './schemas/film.schema';
import { Schedule } from './schemas/schedule.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel('Film')
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDocument[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<FilmDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.filmModel.findById(id).exec();
  }

  async findScheduleByFilmId(id: string): Promise<Schedule[] | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const film = await this.filmModel.findById(id).exec();
    return film?.schedule || null;
  }

  async findScheduleById(filmId: string, scheduleId: string): Promise<Schedule | null> {
    if (!Types.ObjectId.isValid(filmId) || !Types.ObjectId.isValid(scheduleId)) {
      return null;
    }
    const film = await this.filmModel.findById(filmId).exec();
    if (!film) {
      return null;
    }
    const schedule = film.schedule.find(s => s._id.toString() === scheduleId);
    return schedule || null;
  }

  async addTakenSeats(
    filmId: string,
    scheduleId: string,
    seats: string[]
  ): Promise<boolean> {
    if (!Types.ObjectId.isValid(filmId) || !Types.ObjectId.isValid(scheduleId)) {
      return false;
    }

    const film = await this.filmModel.findById(filmId).exec();
    if (!film) {
      return false;
    }

    const schedule = film.schedule.find(s => s._id.toString() === scheduleId);
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
    schedule.taken.push(...seats);
    await film.save();

    return true;
  }

  async create(filmData: Partial<FilmDocument>): Promise<FilmDocument> {
    const createdFilm = new this.filmModel(filmData);
    return createdFilm.save();
  }
}
