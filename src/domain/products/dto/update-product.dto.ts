import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../entities/category.enum';

export class UpdateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  category: ProductCategory;
}
