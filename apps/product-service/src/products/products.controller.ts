import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  @MessagePattern('get_product')
  getProduct(@Payload() id: number) {
    console.log(id);
    return {
      message: 'Product fetched successfully',
      product: {
        id,
        name: 'Product 1',
        price: 100,
      },
    };
  }
}
