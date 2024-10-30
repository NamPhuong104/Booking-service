import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { CredentialModule } from '../credential/credential.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [SessionController],
  imports: [DatabaseModule, CredentialModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
