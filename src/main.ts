import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'secret_shhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000,
    }
  }));

  await app.listen(3000);
}
bootstrap();