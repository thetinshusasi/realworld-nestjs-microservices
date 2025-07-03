import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICE_CLIENTS } from 'src/constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.PRODUCT_REDIS_SERVICE)
    private readonly productRedisService: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  createOrder(@Payload() order: any) {
    console.log('orders-service createOrder', order);

    this.productRedisService.emit('order_created_event', {
      id: Math.floor(Math.random() * 1000),
      productId: Math.floor(Math.random() * 10000),
    });
    console.log('info  sent to redis channel');
    return {
      message: 'Order created successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order: order,
    };
  }
  @MessagePattern('create_order_sync')
  async createOrderSync(@Payload() order: any) {
    console.log('orders-service createOrder', order);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await firstValueFrom(
      this.productRedisService.send('get_product', {
        id: Math.floor(Math.random() * 1000),
      }),
    );
    console.log('data', data);
    console.log('info  sent to redis channel sync');
    return {
      message: 'Order created successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order: order,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      productData: data,
    };
  }
}
