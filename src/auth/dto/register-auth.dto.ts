import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', required: true })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: '8m5yR@example.com', required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '12345678', required: true })
  password: string;
}
