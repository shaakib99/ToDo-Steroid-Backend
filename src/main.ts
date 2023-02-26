import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const { PORT = 3001 } = process.env;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(`Server started at http://localhost:${PORT}`, `NestApplication`);
}
bootstrap();
