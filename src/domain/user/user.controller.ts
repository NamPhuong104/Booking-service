import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// @ApiBearerAuth() // will be use later
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiCreatedResponse({
    description: 'User created',
  })
  //   @ApiUnauthorizedResponse({
  //     description: 'Token is invalid',
  //   })
  //   @ApiOkResponse({}) will be use later
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }
}
