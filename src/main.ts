import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('Booking API')
    .setVersion('1.0')
    .addTag('Booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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
  await app.listen(3000);
}
bootstrap();
