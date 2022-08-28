import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/users/entities/user.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ImagesRepository } from '../repository/images.repository';
import { ProductsRepository } from '../repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository,
  ) {}

  async registProduct(
    user: User,
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const board = await this.productsRepository.registProduct(
      user,
      createProductDto,
    );
    const image = await this.imagesRepository.saveProductImagePath(
      files,
      board,
    );
    const result = { ...board, images_id: [...image.map((el) => el.image_id)] };
    return result;
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

  async updateProduct(
    product_id: string,
    updateProductDto: UpdateProductDto,
    user,
  ) {
    return await this.productsRepository.modify(
      product_id,
      updateProductDto,
      user,
    );
  }

  // 상품 삭제

  async deleteProduct() {
    return '';
  }
}
