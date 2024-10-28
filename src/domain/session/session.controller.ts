import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import { SessionResponseDto } from './dto/session-template-response.dto';
import { SessionService } from './session.service';
import { UserReq } from 'src/common/decorator/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Session')
@Controller('sessions')
export class SessionController {
  constructor(private service: SessionService) {}

  @ApiOperationDecorator({
    type: SessionResponseDto,
    summary: 'Get a session ',
    description: 'Get a session ',
  })
  @Get(':sessionId')
  findById(@Param('sessionId') sessionId: number) {
    return this.service.findById(sessionId);
  }

  @ApiOperationDecorator({
    type: CreateSessionByCoachDto,
    summary: 'Create a new session ',
    description: 'Create new session ',
  })
  @Post('by-coach')
  create(@Body() data: CreateSessionByCoachDto, @UserReq() user: User) {
    data.coachId = user.id;
    return this.service.create(data);
  }
}
