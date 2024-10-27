import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { AuthGuard } from '../guard/auth.guard';
import { UserReq } from 'src/common/decorator/user.decorator';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorator/public.decorator';
import { SerializeInterceptor } from 'src/interceptor/serialize.interceptor';

// @ApiBearerAuth() // will be use later
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany() {
    return this.userService.findMany();
  }

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
  @Public()
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userService.createWithHash(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@UserReq() user: User) {
    return user;
  }

  // TODO: update user info
  @Patch('me')
  updateUserInfo() {
    // TOTO: update user of the id
  }

  // TODO: update password
  @Patch('me/update-password')
  updatePassword() {
    // TODO: updatte user of the id
  }
}
