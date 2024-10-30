import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSessionTemplateDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session template',
    example: 'session template 1',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The description of the session template',
    example: 'This is a session template description',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session template',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  duration: number;
}
