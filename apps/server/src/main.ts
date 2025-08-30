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
    .map(s => s.trim().replace(/\/$/, '')) // без кінцевого слеша
    .filter(Boolean);

// apps/server/src/main.ts
const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const o = origin.replace(/\/$/, '');
    const allowed = allowList.includes(o);
    if (!allowed) {
      console.log('[CORS] reject', { origin, normalized: o, allowList });
      return cb(new Error(`Not allowed by CORS: ${origin}`), false);
    }
    return cb(null, true);
  },
  methods: ['GET','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
  // optionsSuccessStatus: 204, // можна додати, але не обов'язково
};


  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}

bootstrap();
