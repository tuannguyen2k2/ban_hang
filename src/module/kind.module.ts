import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../config/typeorm/typeorm-ex.module';
import { Kind } from '../entity/kind.entity';
import { CategoryRepository } from '../repository/category.repository';
import { KindRepository } from '../repository/kind.repository';
import { KindController } from '../controller/kind.controller';
import { KindService } from '../service/kind.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([Kind, KindRepository]),
        TypeOrmExModule.forCustomRepository([CategoryRepository]),
    ],
    controllers: [KindController],
    providers: [KindService],
})
export class KindModule {}
