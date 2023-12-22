import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { Category } from '../entity/category.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse, setSuccessResponse } from 'src/response/success';
import { errorMessages } from 'src/response/errors/custom';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) {}
    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepo.create(createCategoryDto);
        await this.categoryRepo.save(category);
        return setSuccessResponse('Create category success');
    }

    async findAll(page: number, pageSize: number): Promise<SuccessResponse> {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const [items, totalElements] = await this.categoryRepo.findAndCount({ skip, take });
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list category success', { content: items, totalElements, totalPages });
    }

    async findOne(id: string) {
        const item = await this.categoryRepo.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        return setSuccessResponse('Get category success', { content: item });
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const item = await this.categoryRepo.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.category.notFound);
        }

        await this.categoryRepo.save(Object.assign(item, updateCategoryDto));
        return setSuccessResponse('Update category success');
    }

    async remove(id: string) {
        const item = await this.categoryRepo.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        await this.categoryRepo.delete(id);
        return setSuccessResponse('Delete category success');
    }
}
