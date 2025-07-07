import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('seeder')
  create() {
    return this.productService.create();
  }
  @Get()
  @HttpCode(200)
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productService.getProducts(+page, +limit);
    }
    return this.productService.getProducts(1, 3);
  }
  @Get(':id')
  @HttpCode(200)
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException(
            'The format of the product ID is not valid.',
          ),
      }),
    )
    id: string,
  ) {
    return this.productService.findOne(id);
  }

}
