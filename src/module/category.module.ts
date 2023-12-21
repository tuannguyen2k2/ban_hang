import { Module } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CategoryController } from '../controller/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
