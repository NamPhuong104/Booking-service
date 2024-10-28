import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateSessionDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session',
    example: 'session 1',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session',
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  @Min(5)
  duration?: number;
}
