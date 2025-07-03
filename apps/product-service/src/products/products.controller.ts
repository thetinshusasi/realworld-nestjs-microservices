import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  @MessagePattern('get_product')
  getProduct(@Payload() id: number) {
    console.log(id);
    console.log('get_product');
    return {
      message: 'Product fetched successfully',
      product: {
        id,
        name: 'Product 1',
        price: 100,
      },
    };
  }

  @EventPattern('order_created_event')
  orderCreatedEvent(@Payload() order: { id: number; productId: number }) {
    console.log('order_created_event', order);
    console.log('info  received from redis channel');
  }
}
