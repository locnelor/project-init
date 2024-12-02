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
  public async initAdmin(account: string, password: string, name: string) {
    const count = await this.prisma.sys_user.count();
    if (count > 0) return false
    const { hash, salt } = this.hash.cryptoPassword(password);
    await this.prisma.sys_menu_on_role.deleteMany()
    await this.prisma.sys_role.deleteMany()
    const role = await this.prisma.sys_role.create({
      data: {
        name: "admin"
      }
    })
    const sys_user = await this.prisma.sys_user.create({
      data: {
        account,
        name,
        password: hash,
        salt,
        sys_roleId: role.id
      }
    })
    const menus = await this.prisma.sys_menu.findMany()
    await this.prisma.sys_menu_on_role.createMany({
      data: menus.map((item) => {
        return {
          sys_menuId: item.id,
          sys_roleId: role.id,
          power: (1 << 10) - 1
        }
      })
    })
    return true;
  }

  public async validateUser(account: string, password: string) {
    const user = await this.prisma.sys_user.findUnique({
      where: { account }
    })
    return this.hash.verifyPassword(password, user.salt, user.password);
  }

  getToken(user: SysUserEntity) {
    const payload = {
      crypto: this.hash.md5(`${user.password}`),
      sub: user.id
    };
    return {
      access_token: this.jwt.sign(payload, {
        expiresIn: this.config.getOrThrow('JWT_EXPIRES'),
        secret: this.config.get("JWT_SECRET")
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
    if (this.hash.md5(`${user.password}`) !== crypto) throw NotFoundException
    return user;
  }
}
