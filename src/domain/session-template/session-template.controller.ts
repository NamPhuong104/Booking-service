import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { CreateSessionTemplateDto } from './dto/create-session-template.dto';
import { SessionTemplateResponseDto } from './dto/session-template-response.dto';
import { UpdateSessionTemplateDto } from './dto/update-session-template-dto';
import { SessionTemplateService } from './session-template.service';

@ApiTags('Session Templates')
@Controller('session-templates')
export class SessionTemplateController {
  constructor(private service: SessionTemplateService) {}

  @ApiOperationDecorator({
    type: SessionTemplateResponseDto,
    summary: 'Get a session template',
    description: 'Get a session template',
  })
  @Get(':sessionTemplateId')
  findById(@Param('sessionTemplateId') sessionTemplateId: number) {
    return this.service.findById(sessionTemplateId);
  }

  @ApiOperationDecorator({
    type: SessionTemplateResponseDto,
    summary: 'Create a new session template',
    description: 'Create new session template',
  })
  @Post()
  create(@Body() data: CreateSessionTemplateDto) {
    return this.service.create(data);
  }

  @ApiOperationDecorator({
    type: SessionTemplateResponseDto,
    summary: 'update a session template',
    description: 'update a session template',
  })
  @Patch(':sessionTemplateId')
  updateById(
    @Param('sessionTemplateId') sessionTemplateId: number,
    @Body() data: UpdateSessionTemplateDto,
  ) {
    console.log(sessionTemplateId, data);
    console.log();
  }
}
