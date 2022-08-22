import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  Param,
} from '@nestjs/common';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/domain/users/entities/user.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 상품 등록
  @Post('/regist')
  registProduct(
    @GetUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.registProduct(user, createProductDto);
  }

  // 상품목록
  @Get('/')
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  // 상품상세 페이지
  @Get('/:product_id')
  getProduct(@Param('product_id') product_id: string) {
    return this.productsService.getProduct(product_id);
  }

  // 상품정보 수정
  @Patch('/:id')
  updateProduct() {
    return this.productsService.updateProduct();
  }

  // 상품 삭제
  @Delete()
  deleteProduct() {
    return this.productsService.deleteProduct();
  }
}
