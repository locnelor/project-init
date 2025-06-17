import { Injectable } from '@nestjs/common';
import { PaginationResult, PaginationHelper } from '../../common/dto/pagination.dto';

/**
 * 通用基础服务类
 * @template T - Prisma 表模型类型
 * @template W - Where 条件类型
 * @template D - 数据类型
 */
@Injectable()
export class BaseService<T, W = any, D = any> {
  private table: T;

  /**
   * 构造函数
   * @param table - Prisma 表实例，例如 prismaService.sys_role
   */
  constructor(table: T) {
    this.table = table;
  }

  /**
   * 分页查询
   * @param page - 页码，从1开始
   * @param size - 每页大小
   * @param where - 查询条件，可选
   * @returns 分页结果
   */
  async page(
    page: number = 1,
    size: number = 10,
    where?: W
  ): Promise<PaginationResult<D>> {
    const skip = PaginationHelper.getSkip(page, size);

    // 构建查询参数
    const findManyArgs: any = {
      skip,
      take: size,
    };

    const countArgs: any = {};

    // 如果有where条件，添加到查询参数中
    if (where) {
      findManyArgs.where = where;
      countArgs.where = where;
    }

    // 并行执行数据查询和总数统计
    const [data, total] = await Promise.all([
      (this.table as any).findMany(findManyArgs),
      (this.table as any).count(countArgs),
    ]);

    return PaginationHelper.createResult(data, total, page, size);
  }

  /**
   * 查询所有数据
   * @param where - 查询条件，可选
   * @returns 数据列表
   */
  async findAll(where?: W): Promise<D[]> {
    const args: any = {};
    if (where) {
      args.where = where;
    }
    return await (this.table as any).findMany(args);
  }

  /**
   * 根据条件查询单条数据
   * @param where - 查询条件
   * @returns 单条数据或null
   */
  async findFirst(where: W): Promise<D | null> {
    return await (this.table as any).findFirst({ where });
  }

  /**
   * 根据唯一条件查询单条数据
   * @param where - 唯一查询条件
   * @returns 单条数据或null
   */
  async findUnique(where: any): Promise<D | null> {
    return await (this.table as any).findUnique({ where });
  }

  /**
   * 创建数据
   * @param data - 创建数据
   * @returns 创建的数据
   */
  async create(data: any): Promise<D> {
    return await (this.table as any).create({ data });
  }

  /**
   * 更新数据
   * @param where - 更新条件
   * @param data - 更新数据
   * @returns 更新的数据
   */
  async update(where: any, data: any): Promise<D> {
    return await (this.table as any).update({ where, data });
  }

  /**
   * 删除数据
   * @param where - 删除条件
   * @returns 删除的数据
   */
  async delete(where: any): Promise<D> {
    return await (this.table as any).delete({ where });
  }

  /**
   * 统计数据数量
   * @param where - 查询条件，可选
   * @returns 数据数量
   */
  async count(where?: W): Promise<number> {
    const args: any = {};
    if (where) {
      args.where = where;
    }
    return await (this.table as any).count(args);
  }
}