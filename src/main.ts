import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`URL Shortener API is running on http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
