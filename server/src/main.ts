import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //useGlobalPipes (filter) applies that validation to your entire app (every route, every controller).
  app.useGlobalPipes(new ValidationPipe //Automatically checks incoming data using your DTOs 
    ({
      //Only allow fields from the DTO, and reject anything else
    whitelist:true,
    forbidNonWhitelisted:true,
        transform: true,

  }),
);
  app.enableCors({
    origin: 'http://localhost:3000', // or '*' to allow all origins (for dev)
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
