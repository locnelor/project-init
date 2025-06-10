import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public, JwtAuthGuard, CurrentUser } from '@app/auth-power';

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 用户登录
   */
  @ApiOperation({ summary: '用户登录', description: '用户通过账号密码登录系统' })
  @ApiBody({ type: LoginDto, description: '登录信息' })
  @ApiResponse({ status: 200, description: '登录成功，返回用户信息和token' })
  @ApiResponse({ status: 401, description: '账号或密码错误' })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  /**
   * 获取当前用户信息
   */
  @ApiOperation({ summary: '获取当前用户信息', description: '获取当前登录用户的详细信息' })
  @ApiResponse({ status: 200, description: '成功获取用户信息' })
  @ApiResponse({ status: 401, description: '未授权，需要登录' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async viewer(
    @CurrentUser() user: any
  ) {
    return user;
  }
}
