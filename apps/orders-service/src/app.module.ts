import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENTS.PRODUCT_REDIS_SERVICE,
        transport: Transport.REDIS,
        options: {
          // Host and port are required for Redis transport. if it different machine , provide the correct host and port of the redis server
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
