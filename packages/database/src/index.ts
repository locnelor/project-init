import { PrismaClient, Prisma } from "../generated/client";

// 导出所有 Prisma 类型和客户端
export * from "../generated/client";
export { PrismaClient, Prisma };

// // 定义 Prisma 扩展，用于在创建记录时自动添加时间戳和 UUID
const autoTimestampAndUUIDExtension = Prisma.defineExtension({
  name: 'autoTimestampAndUUID',
  query: {
    $allModels: {
      async create({ args, query }) {
        // 为新记录添加创建时间和更新时间
        args.data.createdAt = new Date()
        args.data.updatedAt = new Date()
        // 生成不带横线的 UUID 作为唯一标识
        const uuid = require("crypto").randomUUID()
        args.data.uid = uuid.toString().split("-").join("");
        return query(args);
      },
    }
  }
})
const model = (Object.keys(Prisma.ModelName) as Prisma.ModelName[]).reduce((pre, cur) => {
  const page = async ({ page, size = 10, ...rest }: {
    page: number,
    size?: number,
  } & {
    [key in string]: any
  }) => {
    const pagination = {
      skip: (page - 1) * size,
      take: size,
    }
    const records = await (prisma[cur].findMany as any)({
      ...pagination,
      ...rest
    })
    const count = await (prisma[cur].count as any)({
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
  pre[cur] = { page }
  return pre
}, {} as {
  [key in Prisma.ModelName]: {
    page: (params: {
      page: number,
      size?: number,
    } & {
      [key in string]: any
    }) => Promise<{
      records: any[],
      count: number,
      page: number,
      size: number,
    }>
  }
})
const pageExtension = Prisma.defineExtension({
  name: "pageExtension",
  model
})
export const prisma = new PrismaClient().$extends(autoTimestampAndUUIDExtension).$extends(pageExtension)

// 导出扩展后的 Prisma 客户端类型
export type ExtendedPrismaClient = typeof prisma