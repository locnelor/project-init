import { HashService } from '@app/hash';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  crypto: string
}

@Injectable()
export class AuthPowerService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly prisma: PrismaService
  ) { }


  async validate({ sub, crypto }: JwtPayload) {
    const user = await this.prisma.sys_user.findUnique({
      where: {
        uid: sub
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                menus: {
                  include: {
                    menu: true
                  }
                }
              }
            }
          }
        },
        department: true
      }
    })
    if (!user) return null;
    if (!this.comparePassword(user.password, crypto)) return null;
    return user;
  }
  /**
   * 生成JWT Token
   */
  generateToken(user: any) {
    const payload: JwtPayload = {
      sub: user.uid,
      crypto: this.hashPassword(user.passport)
    };
    return this.jwtService.sign(payload);
  }

  /**
   * 密码加密
   */
  hashPassword(password: string) {
    const { salt, hash } = this.hashService.cryptoPassword(password);
    return `${salt}:${hash}`
  }

  /**
   * 密码验证
   */
  comparePassword(password: string, hashedPassword: string) {
    const [salt, hash] = hashedPassword.split(':');
    return this.hashService.verifyPassword(password, salt, hash);
  }
}
