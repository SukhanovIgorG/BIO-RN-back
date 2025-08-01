import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

import * as bcrypt from 'bcrypt';

import { type User } from 'types';
import { bcryptConstant } from './constants';
import { MOCK_USERS } from './mocks';

@Injectable()
export class UsersService {
  private readonly users: User[] = MOCK_USERS;

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByRefreshToken(refreshToken: string): Promise<User | undefined> {
    return this.users.find((user) => user.refreshToken === refreshToken);
  }

  async create(dto: RegisterAuthDto): Promise<User> {
    const hashPassword = await bcrypt.hash(
      dto.password,
      bcryptConstant.saltOrRounds,
    );
    const newUser: Omit<User, 'id'> = {
      email: dto.email,
      password: hashPassword,
      username: dto.username,
      refreshToken: undefined,
    };
    const createdUser = { ...newUser, id: this.users.length + 1 };
    this.users.push(createdUser);
    return createdUser;
  }

  updateRefreshToken(userId: number, refreshToken: string): void {
    const user = this.users.find((user) => user.id === userId);
    if (user) {
      user.refreshToken = refreshToken;
    }
  }

  getUsersList(): User[] {
    return this.users;
  }
}
