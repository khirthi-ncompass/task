
import { Exclude } from 'class-transformer';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;
}