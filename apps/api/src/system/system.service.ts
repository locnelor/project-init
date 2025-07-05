
import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/database';

@Injectable()
export class SystemService {
  constructor(
  ) {
    this.createUser()
  }
  async find() {
    const res = await prisma.sys_user.page({
      page: 1,
      size: 10
    })
    console.log(res);
  }

  async createUser() {
    await prisma.sys_user.deleteMany()
    await prisma.sys_user.create({
      data: {
        account: "test1",
        password: "helloWorld",
        name: "test"
      }  
    })
    await this.find()
  }
}
