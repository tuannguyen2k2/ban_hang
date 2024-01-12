import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { KindRepository } from '../repository/kind.repository';
import { errorMessages } from '../response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { CreateKindDto } from '../dto/kind/create-kind.dto';
import { UpdateKindDto } from '../dto/kind/update-kind.dto';

@Injectable()
export class KindService {
    constructor(
        private readonly kindRepository: KindRepository,
        private readonly categoryRepository: CategoryRepository,
    ) {}
    async create(createKindDto: CreateKindDto) {
        const category = await this.categoryRepository.findOneCategoryById(createKindDto.categoryId);
        if (!category) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        const kind = this.kindRepository.create(createKindDto);
        kind.category = category;
        await this.kindRepository.save(kind);
        return setSuccessResponse('Create kind success');
    }

    async findAll(page: number, pageSize: number): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'ASC';
        const [items, totalElements] = await this.kindRepository.findAllKinds(page, pageSize, sortBy, sortOrder);
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list kind success', { content: items, totalElements, totalPages });
    }

    async findOne(id: string) {
        const item = await this.kindRepository.findOneKindById(id);
        if (!item) {
            throw new ConflictException(errorMessages.kind.notFound);
        }

        return setSuccessResponse('Get kind success', { content: item });
    }

    async update(id: string, updateKindDto: UpdateKindDto) {
        const item = await this.kindRepository.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.kind.notFound);
        }

        await this.kindRepository.save(Object.assign(item, updateKindDto));
        return setSuccessResponse('Update kind success');
    }

    async remove(id: string) {
        const item = await this.kindRepository.findOne({ where: { id } });
        if (!item) {
            throw new ConflictException(errorMessages.kind.notFound);
        }
        await this.kindRepository.delete(id);
        return setSuccessResponse('Delete kind success');
    }
}
