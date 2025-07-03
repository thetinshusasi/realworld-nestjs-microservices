import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const tcpMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port: 4002,
      },
    });

  const redisMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
        retryAttempts: 5,
        // retryDelay: 1000,
        // wildcards: true,
        // serializer: new Serializer(),
        // deserializer: new Deserializer(),
      },
    });

  await Promise.all([tcpMicroservice.listen(), redisMicroservice.listen()]);
  console.log('Product service is running on port 4002 and listening to redis');
}

bootstrap();
