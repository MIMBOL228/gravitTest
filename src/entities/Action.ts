import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {BaseEntity} from "typeorm";
import {CreateDateColumn} from "typeorm";

export enum ActionType {
    remove = "remove",
    create = "create"
}

@Entity()
export class Action extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column()
    type: ActionType

    @Column() // Решил пока не использовать inet
    ip: string

    @CreateDateColumn()
    createdAt: Date;
}
