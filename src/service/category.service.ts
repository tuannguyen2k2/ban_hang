import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { Category } from '../entity/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) {}
    create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepo.create(createCategoryDto);
        return this.categoryRepo.save(category);
    }

    async findAll(): Promise<any> {
        return this.categoryRepo.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} category`;
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`;
    }

    remove(id: number) {
        return `This action removes a #${id} category`;
    }
}
