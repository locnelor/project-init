import {
  Controller,
  All,
  Req,
  Res,
  Param,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Gateway')
@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) { }

  @Get('health')
  @ApiOperation({ summary: '网关健康检查' })
  async healthCheck() {
    return {
      gateway: 'healthy',
      timestamp: new Date().toISOString(),
      services: await this.proxyService.healthCheck(),
    };
  }

  @All('system/*path')
  @ApiOperation({ summary: '转发到System服务' })
  async forwardToSystem(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string,
  ) {
    console.log(path)
    return this.forwardRequest('system', `/${path}`, request, response);
  }

  @All('auth/*path')
  @ApiOperation({ summary: '转发到认证服务' })
  async forwardToAuth(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string,
  ) {
    return this.forwardRequest('auth', `/${path}`, request, response);
  }

  @All('file/*path')
  @ApiOperation({ summary: '转发到文件服务' })
  async forwardToFile(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string,
  ) {
    return this.forwardRequest('file', `/${path}`, request, response);
  }

  @All('job/*path')
  @ApiOperation({ summary: '转发到任务服务' })
  async forwardToJob(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string,
  ) {
    return this.forwardRequest('job', `/${path}`, request, response);
  }

  private async forwardRequest(
    serviceName: string,
    path: string,
    request: Request,
    response: Response,
  ) {
    try {
      const result = await this.proxyService.forwardRequest(
        serviceName,
        path,
        request.method,
        request,
      );

      // 转发响应头
      Object.keys(result.headers).forEach(key => {
        if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
          response.setHeader(key, result.headers[key]);
        }
      });

      // 设置状态码并返回数据
      response.status(result.status).json(result.data);
    } catch (error) {
      if (error.response) {
        // 转发服务返回的错误
        response.status(error.response.status).json(error.response.data);
      } else {
        // 网关内部错误
        response.status(502).json({
          success: false,
          message: 'Bad Gateway',
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }
}