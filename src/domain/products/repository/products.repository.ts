import { User } from 'src/domain/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
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
}
