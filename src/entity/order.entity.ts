/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Order extends BaseEntity{

    @Column()
    code: string;

    @Column()
    accountId: string;
}
