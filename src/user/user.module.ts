
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/usecase1.user';
import { UsersController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UsersModule {}
