import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { clients as MICROSERVICE_CLIENTS } from 'src/clients';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.ORDER_SERVICE)
    private readonly orderServiceClient: ClientProxy,
  ) {}

  @Post('createOrder')
  createOrder(@Body() order: any) {
    console.log('api-gateway createOrder 1');
    return this.orderServiceClient.send('create_order', order);
  }
}
