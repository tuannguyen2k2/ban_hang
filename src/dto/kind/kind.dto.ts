/* eslint-disable prettier/prettier */
import { BaseDto } from '../base.dto';
import { Category } from '../../entity/category.entity';

export class CreateKindDto extends BaseDto {
    id: string;
    name: string;
    category: Category;
}
