import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  getUsers() {
    const users = this.usersService.getUsersList();
    return users;
  }
}
