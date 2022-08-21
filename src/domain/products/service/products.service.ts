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

  async getProduct() {
    return '';
  }

  async getAllProducts() {
    return '';
  }

  async updateProduct() {
    return '';
  }

  // 상품 삭제

  async deleteProduct() {
    return '';
  }
}
