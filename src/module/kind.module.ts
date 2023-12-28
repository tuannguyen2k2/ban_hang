import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { Kind } from 'src/entity/kind.entity';
import { CategoryRepository } from 'src/repository/category.repository';
import { KindRepository } from 'src/repository/kind.repository';
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
