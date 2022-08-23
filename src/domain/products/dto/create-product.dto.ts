import { PickType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends PickType(Product, [
  'title',
  'description',
  'price',
  'category',
  'images',
] as const) {}
