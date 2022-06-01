import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user_table } from 'src/entities/usecase1.user'; 
import { user_interface } from './user.interface';

@Injectable()
export class user_service {
  constructor(
    @InjectRepository(user_table)
    private userRepository: Repository <user_table>,
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
    return this.userRepository.findOne({ where: { id: id } });
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