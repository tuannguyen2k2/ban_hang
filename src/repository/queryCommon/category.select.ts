/* eslint-disable prettier/prettier */
import { SelectQueryBuilder } from 'typeorm';
export function selectIdAndNameOfCategory(queryBuilder: SelectQueryBuilder<any>): SelectQueryBuilder<any> {
    return queryBuilder.addSelect(`category.id`).addSelect(`category.name`);
}
