import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  constructor(
    private readonly prismaService: PrismaService
  ) {
    this.init();
  }
  async init() {
    this.initUser()
  }


  // 初始化管理员用户
  async initUser() {
    const count = await this.prismaService.sys_user.count();
    if (count !== 0) return;
    const roles = await this.prismaService.sys_role.findMany();
    return await this.prismaService.sys_user.create({
      data: {
        name: "locnelor",
        account: "locnelor",
        password: "123456",
        roles: {
          createMany: {
            data: roles.map(role => ({
              role_id: role.uid
            }))
          }
        }
      }
    })
  }
}
