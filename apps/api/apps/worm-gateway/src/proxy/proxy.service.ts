import { Injectable, BadGatewayException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export interface ServiceConfig {
  name: string;
  url: string;
  timeout?: number;
  retries?: number;
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly services: Map<string, ServiceConfig> = new Map();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.initializeServices();
  }

  private initializeServices() {
    // 配置各个微服务的地址
    const services: ServiceConfig[] = [
      {
        name: 'system',
        url: process.env.SYSTEM_SERVICE_URL || `http://localhost:${this.configService.get('PORT_SYSTEM') || 3001}`,
        timeout: 30000,
        retries: 3,
      },
      {
        name: 'auth',
        url: process.env.AUTH_SERVICE_URL || `http://localhost:${this.configService.get('PORT_AUTH') || 3002}`,
        timeout: 10000,
        retries: 3,
      },
      {
        name: 'file',
        url: process.env.FILE_SERVICE_URL || `http://localhost:${this.configService.get('PORT_FILE') || 3003}`,
        timeout: 60000,
        retries: 2,
      },
      {
        name: 'job',
        url: process.env.JOB_SERVICE_URL || `http://localhost:${this.configService.get('PORT_JOB') || 3004}`,
        timeout: 30000,
        retries: 2,
      },
    ];
    services.forEach(service => {
      this.services.set(service.name, service);
    });
  }

  /**
   * 转发请求到指定服务
   */
  async forwardRequest(
    serviceName: string,
    path: string,
    method: string,
    request: Request,
  ): Promise<AxiosResponse> {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new BadGatewayException(`Service ${serviceName} not found`);
    }

    const url = `${service.url}${path}`;
    const config: AxiosRequestConfig = {
      method: method.toLowerCase() as any,
      url,
      timeout: service.timeout || 30000,
      headers: this.prepareHeaders(request),
    };

    // 添加请求体（对于POST、PUT、PATCH请求）
    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
      config.data = request.body;
    }

    // 添加查询参数
    if (Object.keys(request.query).length > 0) {
      config.params = request.query;
    }

    try {
      this.logger.log(`Forwarding ${method} ${path} to ${serviceName} service`);
      const response = await firstValueFrom(this.httpService.request(config));
      return response;
    } catch (error) {
      this.logger.error(
        `Failed to forward request to ${serviceName}: ${error.message}`,
        error.stack,
      );

      if (error.response) {
        // 如果是HTTP错误，返回原始错误
        throw error;
      } else {
        // 如果是网络错误或其他错误，返回网关错误
        throw new BadGatewayException(
          `Service ${serviceName} is unavailable`,
        );
      }
    }
  }

  /**
   * 准备转发的请求头
   */
  private prepareHeaders(request: Request): Record<string, string> {
    const headers: Record<string, string> = {};

    // 转发认证头
    if (request.headers.authorization) {
      headers.authorization = request.headers.authorization;
    }

    // 转发内容类型
    if (request.headers['content-type']) {
      headers['content-type'] = request.headers['content-type'] as string;
    }

    // 转发用户代理
    if (request.headers['user-agent']) {
      headers['user-agent'] = request.headers['user-agent'] as string;
    }

    // 添加网关标识
    headers['x-gateway'] = 'worm-gateway';
    headers['x-forwarded-for'] = request.ip || '';
    headers['x-forwarded-host'] = request.get('host') || '';
    headers['x-forwarded-proto'] = request.protocol;

    return headers;
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<Record<string, any>> {
    const results: Record<string, any> = {};

    for (const [name, service] of this.services) {
      try {
        const startTime = Date.now();
        await firstValueFrom(
          this.httpService.get(`${service.url}/health`, {
            timeout: 5000,
          }),
        );
        const responseTime = Date.now() - startTime;
        results[name] = {
          status: 'healthy',
          responseTime: `${responseTime}ms`,
          url: service.url,
        };
      } catch (error) {
        results[name] = {
          status: 'unhealthy',
          error: error.message,
          url: service.url,
        };
      }
    }

    return results;
  }
}