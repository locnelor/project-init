import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginationHelper, PaginationResult } from '../../common/dto/pagination.dto';
import { HashService } from '@app/hash';
import { Prisma } from '@pkg/database';
import { RandomNameService } from '@app/utils';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly randomNameService: RandomNameService,
  ) { }

  /**
   * 获取所有用户
   */
  async findAll() {
    return await this.prisma.sys_user.findMany({
      include: {
        department: {
          select: {
            uid: true,
            name: true,
            code: true,
          },
        },
        roles: {
          include: {
            role: {
              select: {
                uid: true,
                name: true,
                code: true,
              },
            },
          },
        },
        _count: {
          select: {
              roles: true,
              ban_menus: true,
              user_media: true,
            },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * 分页查询用户
   */
  async findMany(queryDto: QueryUserDto): Promise<PaginationResult<any>> {
    const { page = 1, size = 10, name, account, email, phone, status, dept_id } = queryDto;
    const skip = PaginationHelper.getSkip(page, size);

    const where: Prisma.sys_userWhereInput = {};

    if (name) {
      where.name = { contains: name };
    }
    if (account) {
      where.account = { contains: account };
    }
    if (email) {
      where.email = { contains: email };
    }
    if (phone) {
      where.phone = { contains: phone };
    }
    if (status !== undefined) {
      where.status = status;
    }
    if (dept_id) {
      where.department_id = dept_id;
    }


    const [data, total] = await Promise.all([
      this.prisma.sys_user.findMany({
        where,
        include: {
          department: {
          select: {
            uid: true,
            name: true,
            code: true,
          },
        },
          roles: {
            include: {
              role: {
                select: {
                  uid: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          _count: {
            select: {
              roles: true,
              ban_menus: true,
              user_media: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: size,
      }),
      this.prisma.sys_user.count({ where }),
    ]);

    return PaginationHelper.createResult(data, total, page, size);
  }

  /**
   * 根据ID获取用户详情
   */
  async findOne(uid: string) {
    const user = await this.prisma.sys_user.findUnique({
      where: { uid },
      include: {
        department: {
          select: {
            uid: true,
            name: true,
            code: true,
            parent_id: true,
          },
        },
        roles: {
          include: {
            role: {
              select: {
                uid: true,
                name: true,
                code: true,
                data_scope: true,
              },
            },
          },
        },
        ban_menus: {
          include: {
            menu: {
              select: {
                uid: true,
                name: true,
                path: true,
                type: true,
              },
            },
          },
        },
        user_media: {
          include: {
            media: {
              select: {
                uid: true,
                name: true,
                alias: true,
                url: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 移除敏感信息
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    const { account, name, email, phone, password, dept_id, status } = createUserDto;

    // 检查账号是否已存在
    const existingUser = await this.prisma.sys_user.findFirst({
      where: {
        OR: [
          { account },
          { email: email || undefined },
          { phone: phone || undefined },
        ].filter(Boolean),
      },
    });
    if (existingUser) {
      if (existingUser.account === account) {
        throw new BadRequestException('账号已存在');
      }
      if (existingUser.email === email) {
        throw new BadRequestException('邮箱已存在');
      }
      if (existingUser.phone === phone) {
        throw new BadRequestException('手机号已存在');
      }
    }

    // 检查部门是否存在
    if (dept_id) {
      const dept = await this.prisma.sys_department.findUnique({
        where: { uid: dept_id },
      });
      if (!dept) {
        throw new BadRequestException('部门不存在');
      }
    }

    // 生成随机用户名（如果没有提供）
    const userName = name || this.randomNameService.getNickName();

    // 加密密码
    const { salt, hash } = this.hashService.cryptoPassword(password || '123456');
    const hashedPassword = `${salt}:${hash}`;

    const userData = {
      account,
      name: userName,
      email,
      phone,
      password: hashedPassword,
      department_id: dept_id,
      status: status ?? true,
    };

    const user = await this.prisma.sys_user.create({
      data: userData,
      include: {
        department: {
          select: {
            uid: true,
            name: true,
            code: true,
          },
        },
      },
    });

    // 移除敏感信息
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * 更新用户信息
   */
  async update(uid: string, updateUserDto: UpdateUserDto) {
    // 检查用户是否存在
    const existingUser = await this.prisma.sys_user.findUnique({
      where: { uid },
    });
    if (!existingUser) {
      throw new NotFoundException('用户不存在');
    }

    const { account, email, phone, password, dept_id, ...otherData } = updateUserDto;

    // 检查账号、邮箱、手机号是否与其他用户冲突
    if (account || email || phone) {
      const conflictUser = await this.prisma.sys_user.findFirst({
        where: {
          AND: [
            { uid: { not: uid } },
            {
              OR: [
                account ? { account } : {},
                email ? { email } : {},
                phone ? { phone } : {},
              ].filter(obj => Object.keys(obj).length > 0),
            },
          ],
        },
      });
      if (conflictUser) {
        if (conflictUser.account === account) {
          throw new BadRequestException('账号已被其他用户使用');
        }
        if (conflictUser.email === email) {
          throw new BadRequestException('邮箱已被其他用户使用');
        }
        if (conflictUser.phone === phone) {
          throw new BadRequestException('手机号已被其他用户使用');
        }
      }
    }

    // 检查部门是否存在
    if (dept_id) {
      const dept = await this.prisma.sys_department.findUnique({
        where: { uid: dept_id },
      });
      if (!dept) {
        throw new BadRequestException('部门不存在');
      }
    }

    // 准备更新数据
    let updateData: any = { ...otherData };
    if (account) updateData.account = account;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (dept_id) updateData.department_id = dept_id;
    if (password) {
      const { salt, hash } = this.hashService.cryptoPassword(password);
      updateData.password = `${salt}:${hash}`;
    }

    const user = await this.prisma.sys_user.update({
      where: { uid },
      data: updateData,
      include: {
        department: {
          select: {
            uid: true,
            name: true,
            code: true,
          },
        },
      },
    });

    // 移除敏感信息
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * 删除用户
   */
  async remove(uid: string) {
    const user = await this.prisma.sys_user.findUnique({
      where: { uid },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 删除用户相关的关联数据
    await this.prisma.$transaction([
      // 删除用户角色关联
      this.prisma.sys_user_roles.deleteMany({
        where: { user_id: uid },
      }),
      // 删除用户菜单禁用关联
      this.prisma.sys_user_ban_menu.deleteMany({
        where: { user_id: uid },
      }),
      // 删除用户媒体关联
      this.prisma.sys_user_media.deleteMany({
        where: { user_id: uid },
      }),
      // 删除用户
      this.prisma.sys_user.delete({
        where: { uid },
      }),
    ]);

    return { message: '用户删除成功' };
  }

  /**
   * 为用户分配角色
   */
  async assignRoles(userId: string, roleIds: string[]) {
    // 检查用户是否存在
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查角色是否都存在
    const roles = await this.prisma.sys_role.findMany({
      where: {
        uid: { in: roleIds },
      },
    });
    if (roles.length !== roleIds.length) {
      throw new BadRequestException('部分角色不存在');
    }

    // 删除现有角色关联
    await this.prisma.sys_user_roles.deleteMany({
      where: { user_id: userId },
    });

    // 创建新的角色关联
    if (roleIds.length > 0) {
      await this.prisma.sys_user_roles.createMany({
        data: roleIds.map(roleId => ({
          user_id: userId,
          role_id: roleId,
        })),
      });
    }

    return await this.getUserRoles(userId);
  }

  /**
   * 获取用户的角色
   */
  async getUserRoles(userId: string) {
    // 检查用户是否存在
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const userRoles = await this.prisma.sys_user_roles.findMany({
      where: { user_id: userId },
      include: {
        role: {
          select: {
            uid: true,
            name: true,
            code: true,
            data_scope: true,
            status: true,
          },
        },
      },
    });

    return userRoles.map(item => item.role);
  }

  /**
   * 禁用用户访问特定菜单
   */
  async banMenus(userId: string, menuIds: string[]) {
    // 检查用户是否存在
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查菜单是否都存在
    const menus = await this.prisma.sys_menu.findMany({
      where: {
        uid: { in: menuIds },
      },
    });
    if (menus.length !== menuIds.length) {
      throw new BadRequestException('部分菜单不存在');
    }

    // 删除现有禁用菜单关联
    await this.prisma.sys_user_ban_menu.deleteMany({
      where: { user_id: userId },
    });

    // 创建新的禁用菜单关联
    if (menuIds.length > 0) {
      await this.prisma.sys_user_ban_menu.createMany({
        data: menuIds.map(menuId => ({
          user_id: userId,
          menu_id: menuId,
        })),
      });
    }

    return await this.getUserBannedMenus(userId);
  }

  /**
   * 获取用户被禁用的菜单
   */
  async getUserBannedMenus(userId: string) {
    // 检查用户是否存在
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const ban_menus = await this.prisma.sys_user_ban_menu.findMany({
      where: { user_id: userId },
      include: {
        menu: {
          select: {
            uid: true,
            name: true,
            path: true,
            type: true,
            icon: true,
            status: true,
          },
        },
      },
    });

    return ban_menus.map(item => item.menu);
  }

  /**
   * 根据账号查找用户（用于登录）
   */
  async findByAccount(account: string) {
    return await this.prisma.sys_user.findUnique({
      where: { account },
      include: {
        department: {
          select: {
            uid: true,
            name: true,
            code: true,
          },
        },
        roles: {
          include: {
            role: {
              select: {
                uid: true,
                name: true,
                code: true,
                data_scope: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * 验证用户密码
   */
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const [salt, hash] = hashedPassword.split(':');
    return this.hashService.verifyPassword(plainPassword, salt, hash);
  }

  /**
   * 重置用户密码
   */
  async resetPassword(userId: string, newPassword: string) {
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const { salt, hash } = this.hashService.cryptoPassword(newPassword);
    const hashedPassword = `${salt}:${hash}`;

    await this.prisma.sys_user.update({
      where: { uid: userId },
      data: { password: hashedPassword },
    });

    return { message: '密码重置成功' };
  }

  /**
   * 修改用户密码
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 验证旧密码
    const isOldPasswordValid = await this.validatePassword(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new BadRequestException('原密码错误');
    }

    // 设置新密码
    const { salt, hash } = this.hashService.cryptoPassword(newPassword);
    const hashedPassword = `${salt}:${hash}`;

    await this.prisma.sys_user.update({
      where: { uid: userId },
      data: { password: hashedPassword },
    });

    return { message: '密码修改成功' };
  }
}
