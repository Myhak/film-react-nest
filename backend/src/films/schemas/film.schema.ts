import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schedule } from './schedule.schema';

export type FilmDocument = Film & Document;

@Schema({ timestamps: true })
export class Film {
  @Prop({ required: true })
  title: string;

  @Prop()
  rating?: number;

  @Prop()
  director?: string;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop()
  about?: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop()
  cover?: string;

  @Prop({ type: [Schedule], default: [] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
