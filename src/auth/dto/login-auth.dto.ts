import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: '8m5yR@example.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}
