import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';


dotenv.config();


async function bootstrap() {
const app = await NestFactory.create(AppModule);

const origins = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.enableCors({
  origin: origins,
  methods: ['GET','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
});
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

const port = process.env.PORT || 5000;

await app.listen(port);

console.log(`API listening on http://localhost:${port}`);
}
bootstrap();