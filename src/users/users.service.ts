import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';

import * as bcrypt from 'bcrypt';

import { bcryptConstant } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user || undefined;
  }

  async findByRefreshToken(refreshToken: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { refreshToken } });
    return user || undefined;
  }

  async create(dto: RegisterAuthDto): Promise<User> {
    const hashPassword = await bcrypt.hash(
      dto.password,
      bcryptConstant.saltOrRounds,
    );
    const newUser = {
      email: dto.email,
      password: hashPassword,
      username: dto.username,
      refreshToken: null,
    };
    const createdUser = await this.userRepo.save(newUser);
    return createdUser;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepo.update(userId, { refreshToken });
  }

  async getUsersList(): Promise<User[]> {
    return this.userRepo.find();
  }
}
