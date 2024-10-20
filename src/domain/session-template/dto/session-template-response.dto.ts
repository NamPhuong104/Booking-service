import { ApiProperty } from '@nestjs/swagger';

export class SessionTemplateResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The id of the session template',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session template',
    example: 'session template 1',
  })
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session template',
    example: 30,
  })
  duration: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'session template status',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the session template was created',
    example: '2024-09-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the session template was updated',
    example: '2024-09-01T00:00:00Z',
  })
  updatedAt: Date;
}
