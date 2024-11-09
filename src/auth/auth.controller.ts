import { PrismaService } from '@app/prisma';
import { Body, Controller, ForbiddenException, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { sys_user } from '@prisma/client';
import { CurrentUser } from './auth.guard';
import { LoginDto } from './dto/LoginDto';
import { HashService } from '@app/hash';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly auth: AuthService
  ) { }

  @Get("viewer")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取当前用户" })
  viewer(
    @CurrentUser() user: sys_user
  ) {
    return user;
  }

  @Post("login")
  @ApiOperation({ summary: "登录" })
  async login(
    @Body() { account, password }: LoginDto
  ) {
    const user = await this.prisma.sys_user.findUnique({
      where: {
        account
      }
    })
    if (!user) throw new ForbiddenException("用户不存在")
    if (!await this.hash.verifyPassword(password, user.password)) throw new ForbiddenException("密码错误")
    return this.auth.getToken(user)
  }
}

