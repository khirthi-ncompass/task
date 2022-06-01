import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { user_table } from 'src/entities/usecase1.user'; 
import { user_controller } from './user.controller';
import { user_service } from './user.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([user_table])],
  controllers: [user_controller],
  providers: [user_service],
  exports: [user_service],
})
export class UsersModule {}