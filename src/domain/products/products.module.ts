import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controller/products.controller';
import { ImagesRepository } from './repository/images.repository';
import { ProductsRepository } from './repository/products.repository';
import { ProductsService } from './service/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository, ImagesRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
