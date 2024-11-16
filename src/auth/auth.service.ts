import { HashService } from '@app/hash';
import { PrismaService } from '@app/prisma';
import { SysUserEntity } from '@app/prisma/sys.user.entity/sys.user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) { }

  public async validateUser(account: string, password: string) {
    const user = await this.prisma.sys_user.findUnique({
      where: { account }
    })
    return this.hash.verifyPassword(password, user.salt, user.password);
  }

  getToken(user: SysUserEntity) {
    const payload = {
      crypto: this.hash.md5(`${user.password}-${user.loginId}`),
      sub: user.id
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
      include: {
        role: {
          include: {
            sys_menu_on_role: {
              include: {
                menu: true
              }
            }
          }
        }
      }
    })
    if (!user) throw NotFoundException
    if (this.hash.md5(`${user.password}-${user.loginId}`) !== crypto) throw NotFoundException
    return user;
  }
}
