import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from 'apps/booking-service/src/common/decorator/interface';
import { Match } from 'apps/booking-service/src/common/decorator/match.decorator';
import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  // TODO: validate email unique
  @ApiProperty({
    example: 'abc@example.com',
    description: 'email',
    format: 'email',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Matkhau1@',
    description: 'password',
    format: 'password',
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  //   TODO: must have at 1 uppercase, 1 lowercase,  1 number, 1 special charecter //done
  // @Exclude()
  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password need 1 uppercase, 1 lowercase, 1 number, 1 special charecter',
  })
  password: string;

  @ApiProperty({
    example: 'Matkhau1@',
    description: 'password',
    format: 'password',
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'password is not match' })
  password2: string;

  @ApiProperty({
    example: 'Nguyen',
    description: 'First name',
    format: 'First name',
    minLength: 1,
    maxLength: 25,
    nullable: false,
  })
  @MinLength(1)
  @MaxLength(25)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Nam Phuong',
    description: 'Last name',
    format: 'First name',
    minLength: 1,
    maxLength: 25,
    nullable: false,
  })
  @MinLength(1)
  @MaxLength(25)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '+84123456789',
    description: 'Phone',
    format: 'phone',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  //   TODO: validate phone number: +8412345679
  phone?: string;

  @ApiProperty({
    example: 'Indochina Time',
    description: 'Timezone Code',
    format: 'Timezone Code',
    nullable: false,
  })
  //   TODO: validate timezoneCode belongs timezone list of dayjs
  @IsString()
  @IsNotEmpty()
  timezoneCode: string;

  @ApiProperty({
    example: EUserRole.client,
    description: 'Role',
    format: 'Role',
    nullable: false,
  })
  @IsEnum([EUserRole.client, EUserRole.coach])
  @IsString()
  @IsNotEmpty()
  role: string;
}
