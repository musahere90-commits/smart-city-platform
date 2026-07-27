import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(
      loginDto.email,
    );

    console.log('User from DB:', user);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    console.log('Password entered:', loginDto.password);
    console.log('Password in DB:', user.password);

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    console.log('Password Match:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: (user as any)._id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}