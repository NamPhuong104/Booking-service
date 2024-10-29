import { Module } from '@nestjs/common';
import { CredentialsController } from './credential.controller';
import { credentialService } from './credential.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CredentialsController],
  providers: [credentialService],
  exports: [credentialService],
})
export class CredentialModule {}
