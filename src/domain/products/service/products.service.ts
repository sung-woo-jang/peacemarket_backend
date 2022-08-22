import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/users/entities/user.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from '../repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async registProduct(user: User, createProductDto: CreateProductDto) {
    return await this.productsRepository.registProduct(user, createProductDto);
  }

  async getAllProducts() {
    return await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      // .select([
      //   'product.product_id',
      //   'product.title',
      //   'product.description',
      //   'product.price',
      //   'product.status',
      //   'product.createdAt',
      //   'product.category',
      //   'product.userId',
      //   'user.id',
      //   'user.email',
      //   'user.password',
      //   'user.nickname',
      //   'user.imgUrl',
      //   'user.createdAt',
      //   'user.role',
      // ])
      .getRawMany();
  }

  async getProduct(product_id: string) {
    return await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .where({ product_id })
      .getRawOne();
  }

  async updateProduct() {
    return '';
  }

  // 상품 삭제

  async deleteProduct() {
    return '';
  }
}
