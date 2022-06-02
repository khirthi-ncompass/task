import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './userDto.ts';
import { User } from 'src/entities/usecase1.user';
import * as bcrypt from 'bcrypt';




@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}




  readAll() {
    return this.userRepository.find();
  }




  async create(data: UsersDto) {
    const password: string = await this.setPassword(data.password);
    const user = this.userRepository.create({ ...data, password });
    this.userRepository.save(user);
    return { name: user.name, email: user.email };
  }



  async read(id: number) {
    return this.userRepository.findOne({ id: id });
  }




  update(id: number, data: Partial<UsersDto>) {
    this.userRepository.update({ id }, data);
    return this.userRepository.findOne({ id });
  }




  delete(id: number) {
    this.userRepository.delete({ id });
    return { deleted: true };
  }




  async readEmail(email: string) {
    return this.userRepository.findOne({ email: email });
  }




  async setPassword(password: string) {
    if (password) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    }
    throw new BadRequestException('Invalid request');
  }
}