/* eslint-disable prettier/prettier */
import { SelectQueryBuilder } from 'typeorm';
export function selectIdAndNameOfKind(queryBuilder: SelectQueryBuilder<any>): SelectQueryBuilder<any> {
    return queryBuilder.addSelect(`kind.id`).addSelect(`kind.name`);
}
