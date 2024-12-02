import { PrismaService } from '@app/prisma';
import { SysMenuEntity } from '@app/prisma/sys.menu.entity/sys.menu.entity';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { MakeGqlAuthPowerGuard, VIEW_POWER } from 'src/auth/auth.guard';
import { SystemMenuPath } from '../system.resolver';

export const MenuGuard = MakeGqlAuthPowerGuard("/system/menu", "权限管理", SystemMenuPath)
@Resolver()
@UseGuards(MenuGuard())
export class MenuResolver {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  /**
   * 获取菜单
   */
  @Query(() => [SysMenuEntity])
  @UseGuards(MenuGuard([VIEW_POWER]))
  async getMenu() {
    return this.prisma.sys_menu.findMany()
  }

}
