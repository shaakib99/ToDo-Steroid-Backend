import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './common/interceptors';

async function bootstrap() {
  const { PORT = 3001 } = process.env;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(
    ...[new TransformInterceptor(), new LoggingInterceptor()],
  );

  await app.listen(PORT);
  Logger.log(`Server started at ${await app.getUrl()}`, `NestApplication`);
}
bootstrap();
