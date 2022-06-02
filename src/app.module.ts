//connection to database

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';
import { UsersModule } from './user/user.module';
import { User } from './entities/usecase1.user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}