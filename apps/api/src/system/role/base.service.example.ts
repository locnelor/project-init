import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { BaseService } from './base.service';
import { Prisma } from '@pkg/database';

/**
 * BaseService 使用示例
 */
@Injectable()
export class RoleBaseServiceExample {
  private roleBaseService: BaseService<
    typeof PrismaService.prototype.sys_role,
    Prisma.sys_roleWhereInput,
    Prisma.sys_role
  >;

  constructor(private readonly prismaService: PrismaService) {
    // 创建 BaseService 实例，传入 sys_role 表
    this.roleBaseService = new BaseService(this.prismaService.sys_role);
  }

  /**
   * 使用示例：分页查询角色
   */
  async getRolesByPage() {
    // 基本分页查询
    const result1 = await this.roleBaseService.page(1, 10);

    // 带条件的分页查询
    const result2 = await this.roleBaseService.page(1, 10, {
      name: { contains: '管理员' },
    });

    // 复杂条件查询
    const result3 = await this.roleBaseService.page(2, 20, {
      OR: [
        { name: { contains: '管理' } },
        { code: { contains: 'admin' } },
      ],
      status: 1,
    });

    return { result1, result2, result3 };
  }

  /**
   * 使用示例：其他常用方法
   */
  async otherExamples() {
    // 查询所有角色
    const allRoles = await this.roleBaseService.findAll();

    // 根据条件查询所有角色
    const activeRoles = await this.roleBaseService.findAll({
      status: 1,
    });

    // 查询单个角色
    const role = await this.roleBaseService.findFirst({
      code: 'admin',
    });

    // 根据唯一ID查询
    const roleById = await this.roleBaseService.findUnique({
      uid: 'some-uid',
    });

    // 统计角色数量
    const count = await this.roleBaseService.count({
      status: 1,
    });

    // 创建角色
    const newRole = await this.roleBaseService.create({
      name: '新角色',
      code: 'new_role',
      status: 1,
      sort: 1,
    });

    // 更新角色
    const updatedRole = await this.roleBaseService.update(
      { uid: 'some-uid' },
      { name: '更新后的角色名' }
    );

    // 删除角色
    const deletedRole = await this.roleBaseService.delete({
      uid: 'some-uid',
    });

    return {
      allRoles,
      activeRoles,
      role,
      roleById,
      count,
      newRole,
      updatedRole,
      deletedRole,
    };
  }
}

/**
 * 其他表的使用示例
 */
@Injectable()
export class UserBaseServiceExample {
  private userBaseService: BaseService<
    typeof PrismaService.prototype.sys_user,
    Prisma.sys_userWhereInput,
    Prisma.sys_user
  >;

  constructor(private readonly prismaService: PrismaService) {
    // 创建 BaseService 实例，传入 sys_user 表
    this.userBaseService = new BaseService(this.prismaService.sys_user);
  }

  /**
   * 用户分页查询示例
   */
  async getUsersByPage() {
    return await this.userBaseService.page(1, 10, {
      status: 1,
      name: { contains: '张' },
    });
  }
}

/**
 * 菜单表的使用示例
 */
@Injectable()
export class MenuBaseServiceExample {
  private menuBaseService: BaseService<
    typeof PrismaService.prototype.sys_menu,
    Prisma.sys_menuWhereInput,
    Prisma.sys_menu
  >;

  constructor(private readonly prismaService: PrismaService) {
    // 创建 BaseService 实例，传入 sys_menu 表
    this.menuBaseService = new BaseService(this.prismaService.sys_menu);
  }

  /**
   * 菜单分页查询示例
   */
  async getMenusByPage() {
    return await this.menuBaseService.page(1, 10, {
      type: 'menu',
      status: 1,
    });
  }
}