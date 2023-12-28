/* eslint-disable prettier/prettier */
import { SelectQueryBuilder } from 'typeorm';
export function selectCommonFields(queryBuilder: SelectQueryBuilder<any>, alias: string): SelectQueryBuilder<any> {
    return queryBuilder
        .addSelect(`${alias}.id`)
        .addSelect(`${alias}.createdAt`)
        .addSelect(`${alias}.updatedAt`)
        .addSelect(`${alias}.createdBy`)
        .addSelect(`${alias}.updatedBy`);
}
