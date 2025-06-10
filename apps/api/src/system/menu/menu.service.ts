import { PrismaService } from '@app/prisma';
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';
import { PaginationResult, PaginationHelper } from '../../common/dto/pagination.dto';

@Injectable()
export class MenuService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  /**
   * 获取所有菜单（树形结构）
   */
  async findAll() {
    const menus = await this.prismaService.sys_menu.findMany({
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            children: true,
          },
        },
      },
      orderBy: {
        sort: 'asc',
      },
    });

    return this.buildMenuTree(menus);
  }

  /**
   * 分页查询菜单
   */
  async findMany(queryDto: QueryMenuDto): Promise<PaginationResult<any>> {
    const { page = 1, size = 10, name, path, type, visible, status, parent_id } = queryDto;
    const skip = PaginationHelper.getSkip(page, size);

    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }
    if (path) {
      where.path = { contains: path };
    }
    if (type) {
      where.type = type;
    }
    if (visible !== undefined) {
      where.visible = visible;
    }
    if (status !== undefined) {
      where.status = status;
    }
    if (parent_id) {
      where.parent_id = parent_id;
    }

    const [data, total] = await Promise.all([
      this.prismaService.sys_menu.findMany({
        where,
        include: {
          parent: true,
          _count: {
            select: {
              children: true,
            },
          },
        },
        orderBy: {
          sort: 'asc',
        },
        skip,
        take: size,
      }),
      this.prismaService.sys_menu.count({ where }),
    ]);

    return PaginationHelper.createResult(data, total, page, size);
  }

  /**
   * 根据ID获取菜单详情
   */
  async findOne(uid: string) {
    const menu = await this.prismaService.sys_menu.findUnique({
      where: { uid },
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            children: true,
          },
        },
      },
    });

    if (!menu) {
      throw new NotFoundException('菜单不存在');
    }

    return menu;
  }

  /**
   * 创建菜单
   */
  async create(createMenuDto: CreateMenuDto) {
    const { name, path, parent_id, ...data } = createMenuDto;

    // 检查菜单名称是否已存在
    if (name) {
      const existingByName = await this.prismaService.sys_menu.findFirst({
        where: { name },
      });
      if (existingByName) {
        throw new ConflictException('菜单名称已存在');
      }
    }

    // 检查菜单路径是否已存在
    if (path) {
      const existingByPath = await this.prismaService.sys_menu.findFirst({
        where: { path },
      });
      if (existingByPath) {
        throw new ConflictException('菜单路径已存在');
      }
    }

    // 如果有父菜单，检查父菜单是否存在
    if (parent_id) {
      const parentMenu = await this.prismaService.sys_menu.findUnique({
        where: { uid: parent_id },
      });
      if (!parentMenu) {
        throw new BadRequestException('父菜单不存在');
      }
    }

    return await this.prismaService.sys_menu.create({
      data: createMenuDto,
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            children: true,
          },
        },
      },
    });
  }

  /**
   * 更新菜单
   */
  async update(uid: string, updateMenuDto: UpdateMenuDto) {
    const { name, path, parent_id, ...data } = updateMenuDto;

    // 检查菜单是否存在
    const existingMenu = await this.prismaService.sys_menu.findUnique({
      where: { uid },
    });
    if (!existingMenu) {
      throw new NotFoundException('菜单不存在');
    }

    // 检查菜单名称是否已被其他菜单使用
    if (name && name !== existingMenu.name) {
      const existingName = await this.prismaService.sys_menu.findFirst({
        where: {
          name,
          uid: { not: uid },
        },
      });
      if (existingName) {
        throw new ConflictException('菜单名称已存在');
      }
    }

    // 检查菜单路径是否已被其他菜单使用
    if (path && path !== existingMenu.path) {
      const existingPath = await this.prismaService.sys_menu.findFirst({
        where: {
          path,
          uid: { not: uid },
        },
      });
      if (existingPath) {
        throw new ConflictException('菜单路径已存在');
      }
    }

    // 如果要设置父菜单，检查父菜单是否存在且不能设置为自己或自己的子菜单
    if (parent_id) {
      if (parent_id === uid) {
        throw new ConflictException('不能将自己设置为父菜单');
      }

      const parentMenu = await this.prismaService.sys_menu.findUnique({
        where: { uid: parent_id },
      });
      if (!parentMenu) {
        throw new NotFoundException('父菜单不存在');
      }

      // 检查是否会形成循环引用
      const isCircular = await this.checkCircularReference(uid, parent_id);
      if (isCircular) {
        throw new ConflictException('不能将子菜单设置为父菜单');
      }
    }

    return await this.prismaService.sys_menu.update({
      where: { uid },
      data: updateMenuDto,
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            children: true,
          },
        },
      },
    });
  }

  /**
   * 删除菜单
   */
  async remove(uid: string) {
    const menu = await this.prismaService.sys_menu.findUnique({
      where: { uid },
      include: {
        children: true,
      },
    });

    if (!menu) {
      throw new NotFoundException('菜单不存在');
    }

    if (menu.children.length > 0) {
      throw new BadRequestException('存在子菜单，无法删除');
    }

    // 删除相关的角色菜单关联
    await this.prismaService.sys_menu_on_role.deleteMany({
      where: { menu_id: uid },
    });

    // 删除相关的用户菜单黑名单
    await this.prismaService.sys_user_ban_menu.deleteMany({
      where: { menu_id: uid },
    });

    return await this.prismaService.sys_menu.delete({
      where: { uid },
    });
  }

  /**
   * 构建菜单树形结构
   */
  private buildMenuTree(menus: any[]): any[] {
    const menuMap = new Map<string, any>();
    const rootMenus: any[] = [];

    // 创建菜单映射
    menus.forEach(menu => {
      menuMap.set(menu.uid, { ...menu, children: [] });
    });

    // 构建树形结构
    menus.forEach(menu => {
      const menuItem = menuMap.get(menu.uid);
      if (menu.parent_id && menuMap.has(menu.parent_id)) {
        const parent = menuMap.get(menu.parent_id);
        parent.children.push(menuItem);
      } else {
        rootMenus.push(menuItem);
      }
    });

    return rootMenus;
  }

  /**
   * 检查循环引用
   */
  private async checkCircularReference(menuId: string, parentId: string): Promise<boolean> {
    let currentParentId = parentId;
    const visited = new Set<string>();

    while (currentParentId) {
      if (visited.has(currentParentId)) {
        return true; // 检测到循环
      }
      if (currentParentId === menuId) {
        return true; // 检测到循环
      }

      visited.add(currentParentId);
      const parent = await this.prismaService.sys_menu.findUnique({
        where: { uid: currentParentId },
      });

      if (!parent || !parent.parent_id) {
        break;
      }
      currentParentId = parent.parent_id;
    }

    return false;
  }
}
