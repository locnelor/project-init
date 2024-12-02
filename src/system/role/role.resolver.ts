import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CREATE_POWER, DELETE_POWER, MakeGqlAuthPowerGuard, UPDATE_POWER, VIEW_POWER } from 'src/auth/auth.guard';
import { SystemMenuPath } from '../system.resolver';
import { PrismaService } from '@app/prisma';
import { SysRoleEntity } from '@app/prisma/sys.role.entity/sys.role.entity';
import { UseGuards } from '@nestjs/common';
import { SysMenuOnRoleEntity } from '@app/prisma/sys.menu.on.role.entity/sys.menu.on.role.entity';

const RoleGuard = MakeGqlAuthPowerGuard("/system/role", "角色管理", SystemMenuPath)
@Resolver()
export class RoleResolver {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  /**
   * 获取角色
   */
  @Query(() => [SysRoleEntity])
  @UseGuards(RoleGuard([VIEW_POWER]))
  async getRole() {
    return this.prisma.sys_role.findMany({
      include: {
        sys_menu_on_role: true
      }
    })
  }

  /**
   * 新增角色
   */
  @Mutation(() => SysRoleEntity)
  @UseGuards(RoleGuard([CREATE_POWER]))
  createRole(
    @Args("name") name: string,
    @Args("status", { type: () => Boolean, defaultValue: true }) status: boolean,
    @Args("sort", { type: () => Int, nullable: true }) sort?: number,
    @Args("comment", { nullable: true }) comment?: string,
    @Args("id", { type: () => Int, nullable: true }) id?: number
  ) {
    return this.prisma.sys_role.create({
      data: {
        name,
        status,
        comment
      }
    })
  }

  /**
   * 修改角色
   */
  @Mutation(() => SysRoleEntity)
  @UseGuards(RoleGuard([UPDATE_POWER]))
  updateRole(
    @Args("id", { type: () => Int }) id: number,
    @Args("name", { nullable: true }) name?: string,
    @Args("status", { type: () => Boolean, nullable: true }) status?: boolean,
    @Args("sort", { type: () => Int, nullable: true }) sort?: number,
    @Args("comment", { nullable: true }) comment?: string,
  ) {
    return this.prisma.sys_role.update({
      where: {
        id
      },
      data: {
        name,
        status,
        comment
      }
    })
  }

  /**
   * 新增角色权限
   */
  @Mutation(() => SysMenuOnRoleEntity)
  @UseGuards(RoleGuard([CREATE_POWER]))
  createRoleMenu(
    @Args("sys_roleId", { type: () => Int }) sys_roleId: number,
    @Args("sys_menuId", { type: () => Int }) sys_menuId: number,
    @Args("power", { type: () => Int }) power: number,
  ) {
    return this.prisma.sys_menu_on_role.create({
      data: {
        sys_roleId,
        sys_menuId,
        power
      }
    })
  }

  /**
   * 修改角色权限
   */
  @Mutation(() => SysMenuOnRoleEntity)
  @UseGuards(RoleGuard([UPDATE_POWER]))
  updateRoleMenu(
    @Args("sys_roleId", { type: () => Int }) sys_roleId: number,
    @Args("sys_menuId", { type: () => Int }) sys_menuId: number,
    @Args("power", { type: () => Int }) power: number,
  ) {
    return this.prisma.sys_menu_on_role.update({
      where: {
        sys_roleId_sys_menuId: {
          sys_roleId,
          sys_menuId
        }
      },
      data: {
        power
      }
    })
  }

  /**
   * 删除角色权限
   */
  @Mutation(() => Boolean)
  @UseGuards(RoleGuard([DELETE_POWER]))
  deleteRoleMenu(
    @Args("sys_roleId", { type: () => Int }) sys_roleId: number,
    @Args("sys_menuId", { type: () => Int }) sys_menuId: number
  ) {
    return this.prisma.sys_menu_on_role.delete({
      where: {
        sys_roleId_sys_menuId: {
          sys_roleId,
          sys_menuId
        }
      }
    })
  }

  /**
   * 删除角色
   */
  @Mutation(() => Boolean)
  @UseGuards(RoleGuard([DELETE_POWER]))
  async deleteRole(
    @Args("id", { type: () => Int }) id: number
  ) {
    await this.prisma.sys_menu_on_role.deleteMany({
      where: {
        sys_roleId: id
      }
    })
    return await this.prisma.sys_role.delete({
      where: {
        id
      }
    })
  }
}



