// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowList = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map(s => s.trim().replace(/\/$/, '')) // без кінцевого /
    .filter(Boolean);

  const corsOptions: CorsOptions = {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);           // SSR/healthchecks
      const o = origin.replace(/\/$/, '');
      if (allowList.includes(o)) return cb(null, true);
      return cb(new Error(`Not allowed by CORS: ${origin}`), false);
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');   // обов’язково host = 0.0.0.0
  console.log(`API listening on :${port}`);
}
bootstrap();
