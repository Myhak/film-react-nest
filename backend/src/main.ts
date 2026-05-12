import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const format = process.env.LOG_FORMAT ?? 'dev';
  if (format === 'json') app.useLogger(new JsonLogger());
  else if (format === 'tskv') app.useLogger(new TskvLogger());
  else app.useLogger(new DevLogger());

  await app.listen(3000);
}
bootstrap();
