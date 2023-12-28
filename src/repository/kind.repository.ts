/* eslint-disable prettier/prettier */
import { Kind } from 'src/entity/kind.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from '../config/typeorm/typeorm-ex.designator';
import { selectIdAndNameOfCategory } from './queryCommon/category.select';
import { selectCommonFields } from './queryCommon/common.select';
@CustomRepository(Kind)
export class KindRepository extends Repository<Kind> {
    public async findAllKinds(page: number, pageSize: number): Promise<[Kind[], number]> {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        let query = this.createQueryBuilder('kind')
            .leftJoinAndSelect('kind.category', 'category')
            .select(['kind.name'])
            .skip(skip)
            .take(take);
        query = selectCommonFields(query, 'kind');
        query = selectIdAndNameOfCategory(query);
        return await query.getManyAndCount();
    }
    public async findOneKindById(id: string): Promise<Kind> {
        let query = this.createQueryBuilder('kind')
            .leftJoinAndSelect('kind.category', 'category')
            .select(['kind.name'])
            .where('kind.id = :id', { id });
        query = selectCommonFields(query, 'kind');
        query = selectIdAndNameOfCategory(query);
        return await query.getOne();
    }
}
