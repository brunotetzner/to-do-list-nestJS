import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from 'src/users/dto/login-user-dto';

import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: loginUserDto.email },
    });

    const doesPasswordMatch = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!doesPasswordMatch) throw new UnauthorizedException();

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: 50000,
      }),
    };
  }
}
