import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptions } from './exceptions/prisma-exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptions());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
