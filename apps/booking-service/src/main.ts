import setUpApplication from '@libs/core/setup';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, logInfo } = setUpApplication(app);
  await app.listen(port);
  logInfo();
}
bootstrap();
