import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';


dotenv.config();


async function bootstrap() {
const app = await NestFactory.create(AppModule);

app.enableCors({ origin: (process.env.CORS_ORIGIN || '').split(','), credentials: true });
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

const port = process.env.PORT || 5000;

await app.listen(port);

console.log(`API listening on http://localhost:${port}`);
}
bootstrap();