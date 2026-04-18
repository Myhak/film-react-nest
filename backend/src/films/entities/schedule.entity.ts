import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp with time zone' })
  daytime: Date;

  @Column()
  hall: string;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('text', { array: true, default: '{}' })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @Column({ name: 'film_id' })
  filmId: string;
}
