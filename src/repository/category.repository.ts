/* eslint-disable prettier/prettier */
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { selectCommonFields } from './queryCommon/common.select';
import { selectIdAndNameOfKind } from './queryCommon/kind.select';
import { CustomRepository } from '../config/typeorm/typeorm-ex.designator';
@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
    public async findAllCategories(page: number, pageSize: number): Promise<[Category[], number]> {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        let query = this.createQueryBuilder('category')
            .leftJoinAndSelect('category.kinds', 'kind')
            .select(['category.name'])
            .skip(skip)
            .take(take);
        query = selectCommonFields(query, 'category');
        query = selectIdAndNameOfKind(query);
        return await query.getManyAndCount();
    }
    public async findOneCategoryById(id: string): Promise<Category> {
        let query = this.createQueryBuilder('category')
            .leftJoinAndSelect('category.kinds', 'kind')
            .select(['category.name'])
            .where('category.id = :id', { id });
        query = selectCommonFields(query, 'category');
        query = selectIdAndNameOfKind(query);
        return await query.getOne();
    }
}
