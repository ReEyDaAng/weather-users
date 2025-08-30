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
  .map(s => s.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions: CorsOptions = {
    origin: (origin, cb) => {
      // SSR/healthchecks/CLI -> немає Origin
      if (!origin) return cb(null, true);

      const o = origin.replace(/\/$/, '');
      // Тимчасово: якщо whitelist порожній — пускаємо всіх
      if (!allowList.length) return cb(null, true);

      if (allowList.includes(o)) return cb(null, true);

      // LOG для дебагу
      console.warn('[CORS] reject', { origin, allowList });
      return cb(null, false); // ВАЖЛИВО: не кидати Error, інакше не прийдуть заголовки
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,                 // cookies не використовуємо — простіше
    optionsSuccessStatus: 204,          // для деяких проксі/браузерів
    preflightContinue: false,
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');   // обов’язково host = 0.0.0.0
  console.log(`API listening on :${port}`);
}
bootstrap();
