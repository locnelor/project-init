import { PrismaClient } from "@pkg/database";
import { AuthPowerGuard, GqlAuthPowerGuard } from "./guards/power.guard";

let client = new PrismaClient();
let time;
type MenuItem = {
  name: string;
  path: string;
  parent: string;
  sort: number
};

const menuList: MenuItem[] = [];

export const menuPowers = new Map<string, number>();
const initMenu = async () => {
  const current = await client.sys_menu.findMany();
  const menuSet = new Set(menuList.map(item => item.path));
  const currentMap = new Map(current.map(item => [item.path, item]));

  // 检查菜单路径是否有重复
  if (menuSet.size !== menuList.length) {
    console.error("菜单路径有重复!")
    throw new Error('菜单路径有重复')
  }

  // 检查是否有新增菜单
  for (const item of menuList) {
    if (currentMap.has(item.path)) continue;
    console.log(`新增菜单:${item.path} - ${item.name}`)
    const entity = await client.sys_menu.create({
      data: {
        path: item.path,
        name: item.name,
        permission: 0,
        sort: item.sort,
      }
    })
    currentMap.set(item.path, entity)
  }

  // 若数据库中的菜单不在当前菜单列表中，删除该菜单
  for (const item of current) {
    if (!menuSet.has(item.path || '')) {
      console.log(`删除菜单:${item.path} - ${item.name}`)
      // 先删除菜单角色关联
      await client.sys_menu_on_role.deleteMany({
        where: {
          menu_id: item.uid
        }
      })
      // 再删除用户菜单黑名单关联
      await client.sys_user_ban_menu.deleteMany({
        where: {
          menu_id: item.uid
        }
      })
      // 最后删除菜单
      await client.sys_menu.delete({
        where: {
          uid: item.uid
        }
      })
    }
  }

  // 更新菜单信息（包括父级关系、权限、排序等）
  for (const item of menuList) {
    const permission = menuPowers.get(item.path) || 0
    console.log(`同步菜单 - ${item.name} - ${permission.toString(2)}`)
    const parentMenu = item.parent ? currentMap.get(item.parent) : null;

    await client.sys_menu.update({
      where: {
        uid: currentMap.get(item.path)?.uid
      },
      data: {
        parent_id: parentMenu?.uid || null,
        permission,
        sort: item.sort,
        name: item.name // 同步更新菜单名称
      }
    })
  }
}
const run = (item: MenuItem) => {
  if (menuList.some(e => e.path === item.path)) return;
  menuList.push(item);
  clearTimeout(time);
  time = setTimeout(initMenu, 1000)
}
export const makePowerGuard = (path: string, name: string, {
  parent = '',
  sort = 0
} = {}) => {
  run({ path, name, parent, sort })
  const GqlAuthGuard = (power: number[] = []) => {
    menuPowers.set(path, power.reduce((p, e) => p | e, menuPowers.get(path) || 0) || 0)
    return new GqlAuthPowerGuard(path, power)
  }
  const AuthGuard = (power: number[] = []) => {
    menuPowers.set(path, power.reduce((p, e) => p | e, menuPowers.get(path) || 0) || 0)
    return new AuthPowerGuard(path, power);
  }
  return {
    GqlAuthGuard,
    AuthGuard,
    path,
    name,
    parent
  }
}
export const VIEW_POWER = 1; //查询权限
export const CREATE_POWER = 1 << 1; //编辑权限
export const UPDATE_POWER = 1 << 2; //删除权限
export const DELETE_POWER = 1 << 3; //增加权限
export const EXPORT_POWER = 1 << 4; //导出权限
export const IMPORT_POWER = 1 << 5; //导入权限
export const ASSIGN_POWER = 1 << 6; //分配权限
export const UPDATE_SELF_POWER = 1 << 7; //修改自己数据的权限
export const DELETE_SELF_POWER = 1 << 8; //删除自己数据的权限
export const UPDATE_OTHER_POWER = 1 << 9; //修改他人数据的权限
export const DELETE_OTHER_POWER = 1 << 10; //删除他人数据的权限
export const APPROVE_POWER = 1 << 11; //审批权限
export const REJECT_POWER = 1 << 12; //驳回权限
export const PUBLISH_POWER = 1 << 13; //发布权限
export const AUDIT_POWER = 1 << 14; //审核权限
export const ARCHIVE_POWER = 1 << 15; //归档权限
export const RESTORE_POWER = 1 << 16; //恢复权限
export const ADMIN_POWER = 1 << 17; //超级管理权限

// import { makePowerGuard } from './auth.guard';




export const DashboardGuards = makePowerGuard("/dashboard", "仪表盘", {
  sort: 0
})

export const SystemGuards = makePowerGuard("/system", "系统管理", {
  sort: 1024
})
// {
export const SystemUserGuards = makePowerGuard("/system/user", "用户管理", {
  parent: SystemGuards.path,
})
export const SystemRoleGuards = makePowerGuard("/system/role", "角色管理", {
  parent: SystemGuards.path,
})
export const SystemDeptGuards = makePowerGuard("/system/dept", "部门管理", {
  parent: SystemGuards.path,
})
export const SystemMenuGuards = makePowerGuard("/system/menu", "菜单管理", {
  parent: SystemGuards.path,
})
export const SystemFileGuards = makePowerGuard("/system/file", "文件管理", {
  parent: SystemGuards.path,
})
// }

// export const BlogGuards = makePowerGuard("/blog", "博客系统", {
//   sort: 100
// })
// export const BlogArticleGuards = makePowerGuard("/blog/posts", "文章管理", {
//   parent: BlogGuards.path,
// })
// export const BlogCommentGuards = makePowerGuard("/blog/comments", "评论管理", {
//   parent: BlogGuards.path,
// })
// export const BlogCategoriesGuards = makePowerGuard("/blog/categories", "分类管理", {
//   parent: BlogGuards.path,
// })
// export const BlogLinkGuards = makePowerGuard("/blog/links", "友链管理", {
//   parent: BlogGuards.path,
// })
// export const BlogTagsGuards = makePowerGuard("/blog/tag", "标签管理", {
//   parent: BlogGuards.path,
// })


// export const WechatGuards = makePowerGuard("/wechat", "公众号管理", {
//   sort: 200
// })
// // export const WechatConfigGuards = makePowerGuard("/wechat/config", "公众号配置", {
// //   parent: WechatGuards.path,
// // })
// // export const WechatMediaGuards = makePowerGuard("/wechat/media", "素材管理", {
// //   parent: WechatGuards.path,
// // })
// export const WechatAutoReplyGuards = makePowerGuard("/wechat/auto-reply", "自动回复", {
//   parent: WechatGuards.path,
// })
// // export const WechatMenuGuards = makePowerGuard("/wechat/menu", "菜单配置", {
// //   parent: WechatGuards.path,
// // })


// // export const OrderGuards = makePowerGuard("/order", "订单管理", {
// //   sort: 300
// // })
// export const OrderListGuards = makePowerGuard("/order/list", "订单列表", {
//   parent: WechatGuards.path,
// })
// export const OrderAnalysisGuards = makePowerGuard("/order/analysis", "订单统计", {
//   parent: WechatGuards.path,
// })
// export const OrderGoodsGuards = makePowerGuard("/order/goods", "商品管理", {
//   parent: WechatGuards.path
// })

