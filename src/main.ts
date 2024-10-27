import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SerializeInterceptor } from './interceptor/serialize.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //setup prefix
  app.setGlobalPrefix('api');

  //Config document
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('Booking API')
    .setVersion('1.0')
    .addTag('Booking')
    // .addServer('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // setup data return
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (ValidationErrors: ValidationError[] = []) => {
        return new BadRequestException(ValidationErrors);
      },
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );

  // use interceptor
  app.useGlobalInterceptors(new SerializeInterceptor());

  const appPort = process.env.APP_PORT || 3000;
  await app.listen(appPort);

  console.table({
    port: appPort,
    name: 'Booking API',
  });
}
bootstrap();
