import { Module } from '@nestjs/common';
import { SessionTemplateController } from './session-template.controller';
import { SessionTemplateService } from './session-template.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [SessionTemplateController],
  imports: [DatabaseModule],
  providers: [SessionTemplateService],
})
export class SessionTemplateModule {}
