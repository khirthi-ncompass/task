import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class user_table {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string
}