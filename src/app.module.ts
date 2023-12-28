import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Category } from './entity/category.entity';
import { Order } from './entity/order.entity';
import { Kind } from './entity/kind.entity';
import { ConnectionOptions } from 'tls';
import { CategoryModule } from './module/category.module';
import { KindModule } from './module/kind.module';
import { TypeOrmExModule } from './config/typeorm/typeorm-ex.module';
import { CategoryRepository } from './repository/category.repository';

const ENV = process.env.NODE_ENV;
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                const ssl = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false;

                return {
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT, 10),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: [Product, Category, Order, Kind],
                    autoLoadEntities: true,
                    synchronize: true,
                    ssl,
                    extra: {
                        sslmode: 'require',
                    },
                } as ConnectionOptions;
            },
        }),
        TypeOrmExModule.forCustomRepository([CategoryRepository]),
        CategoryModule,
        KindModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
