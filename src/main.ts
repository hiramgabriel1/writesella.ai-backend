import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:5173/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
    exposedHeaders: 'Content-Range,X-Content-Range',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 3600,
  });

  await app.listen(3000);
}

bootstrap();
