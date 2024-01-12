import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { errorMessages } from '../response/errors/custom';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        await this.categoryRepository.save(category);
        return setSuccessResponse('Create category success');
    }

    async findAll(page: number, pageSize: number): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'DESC';
        const [items, totalElements] = await this.categoryRepository.findAllCategories(
            page,
            pageSize,
            sortBy,
            sortOrder,
        );

        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list category success', { content: items, totalElements, totalPages });
    }

    async findOne(id: string) {
        const item = await this.categoryRepository.findOneCategoryById(id);
        if (!item) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        return setSuccessResponse('Get category success', { content: item });
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const item = await this.categoryRepository.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.category.notFound);
        }

        await this.categoryRepository.save(Object.assign(item, updateCategoryDto));
        return setSuccessResponse('Update category success');
    }

    async remove(id: string) {
        const item = await this.categoryRepository.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        await this.categoryRepository.delete(id);
        return setSuccessResponse('Delete category success');
    }
}
