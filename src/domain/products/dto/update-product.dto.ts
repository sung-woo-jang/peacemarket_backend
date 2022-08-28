import { PickType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class UpdateProductDto extends PickType(Product, [
  'title',
  'description',
  'price',
  'status',
  'category',
] as const) {}
