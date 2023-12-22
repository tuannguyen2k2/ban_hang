/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Product extends BaseEntity {

    @Column()
    name: string;

    @Column('text', { array: true, nullable: true })
    size: string[];

    @Column('text', { array: true, nullable: true })
    color: string[];

    @Column()
    material: string;

    @Column()
    price: number;

    @Column()
    discount: number;

    @Column()
    quantity: number;
    @Column()
    weight: string;

    @Column('text', { array: true, nullable: true })
    image: string;

    @Column()
    kindId: string;
}
