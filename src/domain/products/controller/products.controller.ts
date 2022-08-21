import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 상품 등록
  @Post('/regist')
  registProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.registProduct(createProductDto);
  }

  // 상품상세 페이지
  @Get('/:id')
  getProduct() {
    return this.productsService.getProduct();
  }
  // 상품목록
  @Get('/')
  getAllProducts() {
    return this.productsService.getAllProducts();
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
