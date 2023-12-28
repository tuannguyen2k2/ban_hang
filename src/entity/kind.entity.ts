/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity()
export class Kind extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(() => Category, (category) => category.kinds, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    category: Category;
}
