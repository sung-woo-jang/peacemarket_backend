import { NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductCategory } from '../entities/category.enum';
import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async registProduct(user: User, createProductDto: CreateProductDto) {
    const { category, description, price, title } = createProductDto;
    const categoryEnum = +ProductCategory[`${category}`];
    const userId = user['userId'];

    const board = await this.create({
      category: categoryEnum,
      description,
      price,
      title,
      user: userId,
    }).save();

    return board;
  }

  async modify(product_id: string, updateProductDto: UpdateProductDto, user) {
    const product = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .where('product.userId = :userId', { userId: user.userId })
      .andWhere('product_id = :product_id', { product_id })
      .select([
        'product.product_id AS product_id',
        'product.title AS title',
        'product.description AS description',
        'product.price AS price',
        'product.status AS status',
        'product.createdAt AS createdAt',
        'product.category AS category',
        'user.id AS user_id',
        'user.email AS email',
        'user.password AS password',
        'user.nickname AS nickname',
        'user.imgUrl AS imgUrl',
        'user.createdAt AS createdAt',
        'user.role AS role',
      ])
      .getRawOne();

    if (product === undefined)
      throw new NotFoundException('게시물을 찾을 수 없습니다.');

    for (const key in updateProductDto)
      product[`${key}`] = updateProductDto[key];

    await this.save(product);

    return product;
  }
}
