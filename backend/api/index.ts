import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AppModule } from '../src/app.module';

const server = express();
let isReady = false;

async function bootstrap() {
  if (isReady) return server;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { logger: false });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }));
  await app.init();
  isReady = true;
  return server;
}

export default async (req: any, res: any) => {
  await bootstrap();
  server(req, res);
};
