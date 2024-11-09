import { HashService } from '@app/hash';
import { PrismaService } from '@app/prisma';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { sys_user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly config: ConfigService
  ) {
  }
  getToken(user: sys_user) {
    const payload = {
      crypto: this.hash.sha1(user.password),
      sub: user.id,
    };
    return {
      access_token: this.jwt.sign(payload, {
        expiresIn: this.config.getOrThrow('JWT_EXPIRES'),
      }),
    };
  }

  async validate({ crypto, sub }) {
    const user = await this.prisma.sys_user.findUnique({
      where: {
        id: sub
      },
    })
    if (!user) throw NotFoundException
    if (this.hash.sha1(user.password) !== crypto) throw ForbiddenException
    return user;
  }
}
