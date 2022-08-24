import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/domain/users/entities/user.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../service/products.service';
import { registProductMulterOption } from 'src/util/multer.options';
import { ProductsAPIDocs } from '../docs/products.docs';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/decorator/skip-auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // 상품 등록
  @ApiOperation(ProductsAPIDocs.registProductOperation())
  @ApiCreatedResponse(ProductsAPIDocs.registProductCreatedResponse())
  @Post('/regist')
  @UseInterceptors(FilesInterceptor('images', 8, registProductMulterOption))
  async registProduct(
    @GetUser() user: User,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.productsService.registProduct(
      user,
      createProductDto,
      files,
    );
  }

  // 상품목록
  @ApiOperation(ProductsAPIDocs.getAllProductsOperation())
  @ApiResponse(ProductsAPIDocs.getAllProductsResponse())
  @Public()
  @Get('/')
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  // 상품상세 페이지
  @ApiOperation(ProductsAPIDocs.getProductOperation())
  @ApiParam(ProductsAPIDocs.getProductParam())
  @ApiResponse(ProductsAPIDocs.getProductResponse())
  @ApiUnauthorizedResponse(ProductsAPIDocs.getProductUnauthorizedResponse())
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
