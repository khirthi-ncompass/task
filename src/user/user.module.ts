import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserTable } from 'src/entities/usecase1.user'; 
import { UserController } from './user.controller';
import { UserService } from './user.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([UserTable])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}

//change the names