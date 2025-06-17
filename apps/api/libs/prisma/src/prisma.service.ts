import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@pkg/database';
import { randomUUID } from 'crypto';
export type PageOptions = {
  page: number,
  size?: number,
} & {
  [key in string]: any
}
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error'],
      errorFormat: 'pretty',
    })
  }
  page = (Object.keys(Prisma.ModelName) as Prisma.ModelName[]).reduce((pre, cur) => {
    pre[cur] = async ({ page, size = 10, ...rest }: PageOptions) => {
      const pagination = {
        skip: (page - 1) * size,
        take: size,
      }
      const records = await (this[cur].findMany as any)({
        ...pagination,
        ...rest
      })
      const count = await (this[cur].count as any)({
        ...pagination,
        where: rest.where,
      })
      return {
        records,
        count,
        page,
        size
      }
    }
    return pre
  }, {} as {
    [key in Prisma.ModelName]: (params: PageOptions) => Promise<{
      records: any[],
      count: number,
      page: number,
      size: number,
    }>
  })


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
