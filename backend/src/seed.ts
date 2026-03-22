import 'dotenv/config';
import { Film, FilmSchema } from './films/schemas/film.schema';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL not found in environment');
    process.exit(1);
  }

  await mongoose.connect(databaseUrl);

  const FilmModel = mongoose.model('Film', FilmSchema);

  // Читаем данные из JSON файла
  const stubPath = path.join(process.cwd(), 'test', 'mongodb_initial_stub.json');
  const filmsData = JSON.parse(fs.readFileSync(stubPath, 'utf-8'));

  // Очищаем коллекцию
  await FilmModel.deleteMany({});

  // Вставляем новые данные
  for (const filmData of filmsData) {
    const film = new FilmModel({
      title: filmData.title,
      rating: filmData.rating,
      director: filmData.director,
      tags: filmData.tags,
      about: filmData.about,
      description: filmData.description,
      image: filmData.image,
      cover: filmData.cover,
      schedule: filmData.schedule.map(s => ({
        daytime: new Date(s.daytime),
        hall: String(s.hall),
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken || [],
      })),
    });
    await film.save();
    console.log(`Film "${film.title}" added with ID: ${film._id}`);
  }

  console.log('All films imported successfully!');
  await mongoose.connection.close();
}

bootstrap()
  .catch(console.error);
