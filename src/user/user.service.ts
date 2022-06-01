import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTable } from 'src/entities/usecase1.user'; 
import { user_interface } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserTable)
    private userRepository: Repository <UserTable>,
  ) {}

  showAll() {
    return this.userRepository.find();
  }

  create(data: user_interface) {
    const user = this.userRepository.create(data);
    this.userRepository.save(data);
    return user;
  }
  read(id: number) {
    return this.userRepository.findOne({id});
  }

  update(id: number, data: Partial <user_interface>) {
    this.userRepository.update({ id }, data);
    return this.userRepository.findOne({ id });
  }

  destroy(id: number) {
    this.userRepository.delete({ id });
    return { deleted: true };
  }
}