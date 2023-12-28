/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Kind } from './kind.entity';

@Entity()
export class Category extends BaseEntity {
    @Column()
    name: string;
    @OneToMany(() => Kind, (kind) => kind.category, { cascade: true })
    kinds: Kind[];
}
