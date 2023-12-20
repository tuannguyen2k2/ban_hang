/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    constructor() {
        this.id = uuid();
    }
}
