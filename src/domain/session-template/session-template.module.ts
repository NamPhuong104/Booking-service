import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SessionTemplateController } from './session-template.controller';
import { SessionTemplateService } from './session-template.service';

@Module({
  controllers: [SessionTemplateController],
  imports: [DatabaseModule],
  providers: [SessionTemplateService],
})
export class SessionTemplateModule {}
