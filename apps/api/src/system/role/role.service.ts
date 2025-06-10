import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { PaginationResult, PaginationHelper } from '../../common/dto/pagination.dto';
import { Prisma } from '@pkg/database';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  /**
   * 获取所有角色
   */
  async findAll() {
    return await this.prismaService.sys_role.findMany({
      include: {
        _count: {
          select: {
            users: true,
            menus: true,
          },
        },
      },
      orderBy: {
        sort: 'asc',
      },
    });
  }

  /**
   * 分页查询角色
   */
  async findMany(queryDto: QueryRoleDto): Promise<PaginationResult<any>> {
    const { page = 1, size = 10, name, code, status, data_scope } = queryDto;
    const skip = PaginationHelper.getSkip(page, size);

    const where: Prisma.sys_roleWhereInput = {};
    if (name) {
      where.name = { contains: name };
    }
    if (code) {
      where.code = { contains: code };
    }
    if (status !== undefined) {
      where.status = status;
    }
    if (data_scope) {
      where.data_scope = data_scope;
    }

    const [data, total] = await Promise.all([
      this.prismaService.sys_role.findMany({
        where,
        include: {
          _count: {
            select: {
              users: true,
              menus: true,
            },
          },
        },
        orderBy: {
          sort: 'asc',
        },
        skip,
        take: size,
      }),
      this.prismaService.sys_role.count({ where }),
    ]);

    return PaginationHelper.createResult(data, total, page, size);
  }

  /**
   * 根据ID获取角色详情
   */
  async findOne(uid: string) {
    const role = await this.prismaService.sys_role.findUnique({
      where: { uid },
      include: {
        menus: {
          include: {
            menu: true,
          },
        },
        users: {
          include: {
            user: {
              select: {
                uid: true,
                name: true,
                account: true,
                email: true,
                phone: true,
                status: true,
              },
            },
          },
        },
        _count: {
          select: {
            users: true,
            menus: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    return role;
  }

  /**
   * 创建角色
   */
  async create(createRoleDto: CreateRoleDto) {
    const { name, code } = createRoleDto;

    // 检查角色名称是否已存在
    const existingByName = await this.prismaService.sys_role.findFirst({
      where: { name },
    });
    if (existingByName) {
      throw new ConflictException('角色名称已存在');
    }

    // 检查角色编码是否已存在
    const existingByCode = await this.prismaService.sys_role.findFirst({
      where: { code },
    });
    if (existingByCode) {
      throw new ConflictException('角色编码已存在');
    }

    return await this.prismaService.sys_role.create({
      data: createRoleDto,
      include: {
        _count: {
          select: {
            users: true,
            menus: true,
          },
        },
      },
    });
  }

  /**
   * 更新角色
   */
  async update(uid: string, updateRoleDto: UpdateRoleDto) {
    const { name, code } = updateRoleDto;

    // 检查角色是否存在
    const existingRole = await this.prismaService.sys_role.findUnique({
      where: { uid },
    });
    if (!existingRole) {
      throw new NotFoundException('角色不存在');
    }

    // 检查角色名称是否已被其他角色使用
    if (name && name !== existingRole.name) {
      const existingName = await this.prismaService.sys_role.findFirst({
        where: {
          name,
          uid: { not: uid },
        },
      });
      if (existingName) {
        throw new ConflictException('角色名称已存在');
      }
    }

    // 检查角色编码是否已被其他角色使用
    if (code && code !== existingRole.code) {
      const existingCode = await this.prismaService.sys_role.findFirst({
        where: {
          code,
          uid: { not: uid },
        },
      });
      if (existingCode) {
        throw new ConflictException('角色编码已存在');
      }
    }

    return await this.prismaService.sys_role.update({
      where: { uid },
      data: updateRoleDto,
      include: {
        _count: {
          select: {
            users: true,
            menus: true,
          },
        },
      },
    });
  }

  /**
   * 删除角色
   */
  async remove(uid: string) {
    const role = await this.prismaService.sys_role.findUnique({
      where: { uid },
      include: {
        users: true,
      },
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    if (role.users.length > 0) {
      throw new BadRequestException('角色下存在用户，无法删除');
    }

    // 删除相关的角色菜单关联
    await this.prismaService.sys_menu_on_role.deleteMany({
      where: { role_id: uid },
    });

    return await this.prismaService.sys_role.delete({
      where: { uid },
    });
  }

  /**
   * 为角色分配菜单权限
   */
  async assignMenus(roleId: string, menuIds: string[]) {
    // 检查角色是否存在
    const role = await this.prismaService.sys_role.findUnique({
      where: { uid: roleId },
    });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    // 检查菜单是否存在
    const menus = await this.prismaService.sys_menu.findMany({
      where: {
        uid: { in: menuIds },
      },
    });
    if (menus.length !== menuIds.length) {
      throw new BadRequestException('部分菜单不存在');
    }

    // 删除现有的角色菜单关联
    await this.prismaService.sys_menu_on_role.deleteMany({
      where: { role_id: roleId },
    });

    // 创建新的角色菜单关联
    if (menuIds.length > 0) {
      await this.prismaService.sys_menu_on_role.createMany({
        data: menuIds.map(menuId => ({
          role_id: roleId,
          menu_id: menuId,
        })),
      });
    }

    return { success: true };
  }

  /**
   * 获取角色的菜单权限
   */
  async getRoleMenus(roleId: string) {
    const role = await this.prismaService.sys_role.findUnique({
      where: { uid: roleId },
      include: {
        menus: {
          include: {
            menu: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    return role.menus.map(item => item.menu);
  }
}
