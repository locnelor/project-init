import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@pkg/database';
import { randomUUID } from 'crypto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    this.$extends({
      query: {
        $allModels: {
          async create({ args, query }) {
            args.data.createdAt = new Date()
            args.data.updatedAt = new Date()
            if ("uid" in args.data) {
              args.data.uid = randomUUID().replaceAll("-", "")
            }
            return query(args);
          },
        }
      }
    })
    try {
      await this.$connect();
      console.log('Prisma 连接成功');
    } catch (error) {
      console.error('Prisma 连接失败:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
