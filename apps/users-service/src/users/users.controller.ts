import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  @MessagePattern('get_user')
  getUser(@Payload() id: number) {
    console.log(id);
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'User fetched successfully',
    };
  }
}
