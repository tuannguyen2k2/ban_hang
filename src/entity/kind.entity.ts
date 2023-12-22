/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Kind extends BaseEntity {
    @Column()
    name: string;

    @Column()
    categoryId: string;
}
