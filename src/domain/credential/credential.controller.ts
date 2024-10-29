import { Controller, Get, Query } from '@nestjs/common';
import { credentialService } from './credential.service';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('credentials')
export class CredentialsController {
  constructor(private credentialService: credentialService) {}

  @Get('google-auth-url')
  getGoogleAuthUrl() {
    return this.credentialService.getGoogleAuthUrl();
  }

  @Public()
  @Get('google-auth-callback')
  handleGoogleAuthCallback(@Query() query: any) {
    return this.credentialService.handleGoogleAuthCallback(query.code);
  }
}
