import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserTable {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string
}