import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  imports: [DatabaseModule],
  providers: [SessionService],
})
export class SessionModule {}
