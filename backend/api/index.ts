import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AppModule } from '../src/app.module';

const server = express();
let isReady = false;

async function bootstrap() {
  if (isReady) return;
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { logger: ['error', 'warn'] });
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }));
    await app.init();
    isReady = true;
  } catch (err) {
    console.error('Bootstrap error:', err);
    throw err;
  }
}

export default async (req: express.Request, res: express.Response) => {
  try {
    await bootstrap();
    server(req, res);
  } catch (err) {
    console.error('Request error:', err);
    res.status(500).json({ error: String(err) });
  }
};
