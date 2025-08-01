import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  getUsers() {
    const users = this.usersService.getUsersList();
    return users;
  }
}
