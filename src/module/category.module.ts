import { Module } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CategoryController } from '../controller/category.controller';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/category.repository';
import { TypeOrmExModule } from '../config/typeorm/typeorm-ex.module';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([Category, CategoryRepository])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
