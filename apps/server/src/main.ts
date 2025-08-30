import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parse CORS origins from environment variable
  const origins = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  console.log('CORS Origins configured:', origins);

  app.enableCors({
    origin: origins.length > 0 ? origins : true, // Fallback to allow all if no origins specified
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With'
    ],
    credentials: true, // Important if you're sending cookies or auth headers
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true,
    forbidNonWhitelisted: true
  }));

  const port = process.env.PORT || 5000;

  // Important: bind to 0.0.0.0 for Railway deployment
  await app.listen(port, '0.0.0.0');

  console.log(`API listening on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
}

bootstrap().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});