import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { CredentialModule } from '../credential/credential.module';

@Module({
  controllers: [SessionController],
  imports: [DatabaseModule, CredentialModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
