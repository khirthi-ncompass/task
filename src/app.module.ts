//connection to database

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { user_controller } from './user/user.controller';
import { user_service } from './user/user.service';
import { UsersModule } from './user/user.module'; 
import { user_table } from './entities/usecase1.user';


@Module({
  imports: [user_table, TypeOrmModule.forRoot({
    type:'mysql',
    host:'l1-swift.ctqnawjozhfg.ap-southeast-2.rds.amazonaws.com',
    username:"khirthi2",
    password:"test",
    database:"khirthi",
    port:3306,
    entities:[user_table],
    synchronize:true
 }), UsersModule, TypeOrmModule.forFeature([user_table])],
  controllers: [AppController, user_controller],
  providers: [AppService, user_service],
})
export class AppModule {}