/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('text', { nullable: true })
    createdBy: string;

    @Column('text', { nullable: true })
    updatedBy: string;

    constructor() {
        this.id = uuid();
    }
}
