import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from '../repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    productsRepository: ProductsRepository,
  ) {}

  async registProduct(createProductDto: CreateProductDto) {
    return '';
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
