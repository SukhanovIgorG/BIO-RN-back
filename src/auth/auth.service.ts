import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

import { type User } from 'types';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async getAuth(user: User) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '5h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    this.usersService.updateRefreshToken(user.id, refreshToken);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const existingUser = await this.usersService.findByEmail(
      registerAuthDto.email,
    );
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const user = await this.usersService.create(registerAuthDto);
    return await this.getAuth(user);
  }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    return await this.getAuth(user);
  }

  async refresh(refreshToken: string) {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.getAuth(user);
  }
}
