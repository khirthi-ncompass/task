//connection to database

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserTable } from './entities/usecase1.user';
import { UsersModule } from './user/user.module'; 
import 'dotenv/config'
console.log(process.env.DB_HOST);

@Module({
  imports: [ TypeOrmModule.forRoot({
    type:'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    entities:[UserTable],
    synchronize:true
 }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}