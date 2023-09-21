import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {BaseEntity} from "typeorm";

@Entity()
export class Document extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({
        length: 2097152,
    })
    content: string

    @Column()
    deleteTokenHash: string

    @Column() // Решил пока не использовать inet
    ip: string
}
