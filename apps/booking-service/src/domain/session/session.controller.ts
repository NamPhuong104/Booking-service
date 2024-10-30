import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import { SessionResponseDto } from './dto/session-template-response.dto';
import { SessionService } from './session.service';
import { User } from '@prisma/client';
import { ApiOperationDecorator } from '../../common/decorator/api-operation.decorator';
import { UserReq } from '../../common/decorator/user.decorator';

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
    return this.service.createSession(data);
  }
}
