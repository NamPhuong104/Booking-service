import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSessionByCoachDto {
  // @ApiProperty({
  //   type: String,
  //   required: true,
  //   description: 'The name of the session',
  //   example: 'session 1',
  // })
  // @IsString()
  // @MinLength(5)
  // @MaxLength(50)
  // @IsNotEmpty()

  // get coachId form token
  coachId?: number;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  sessionTemplateId: number;

  @IsISO8601({ strictSeparator: true })
  @IsNotEmpty()
  startAt: Date;
}
