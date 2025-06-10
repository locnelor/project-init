import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { AuthPowerService } from '@app/auth-power';
import { LoginDto } from './dto/login.dto';
import { AccountOrPasswordError } from '@app/error/http.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authPowerService: AuthPowerService,
  ) { }

  /**
   * 用户登录
   */
  async login(loginDto: LoginDto) {
    const { account, password } = loginDto;
    // 查找用户
    const user = await this.prisma.sys_user.findUnique({
      where: { account },
    });
    if (!user || !user.status) {
      throw new UnauthorizedException('账号不存在或已被禁用');
    }

    // 验证密码
    if (!this.authPowerService.comparePassword(
      password,
      user.password
    )) {
      throw AccountOrPasswordError
    }

    // 更新最后登录时间
    await this.prisma.sys_user.update({
      where: { uid: user.uid },
      data: { last_login_at: new Date() },
    });
    // 生成令牌
    const access_token = this.authPowerService.generateToken(user);

    return {
      ...user,
      password: '',
      access_token
    };
  }
}
