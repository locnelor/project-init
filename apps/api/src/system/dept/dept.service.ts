import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { QueryDeptDto } from './dto/query-dept.dto';
import { PaginationHelper } from '../../common/dto/pagination.dto';

@Injectable()
export class DeptService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * 创建部门
   */
  async create(createDeptDto: CreateDeptDto) {
    const { name, code, parent_id, ...data } = createDeptDto;

    // 检查部门名称是否已存在
    const existingByName = await this.prisma.sys_department.findUnique({
      where: {
        name: createDeptDto.name,
      },
    });

    if (existingByName) {
      throw new BadRequestException('部门名称已存在');
    }

    // 检查部门编码是否已存在
    const existingByCode = await this.prisma.sys_department.findFirst({
      where: {
        code: createDeptDto.code,
        uid: { not: undefined },
      },
    });

    if (existingByCode) {
      throw new BadRequestException('部门编码已存在');
    }

    // 如果有父部门，检查父部门是否存在
    if (createDeptDto.parent_id) {
      const parentDept = await this.prisma.sys_department.findUnique({
        where: { uid: createDeptDto.parent_id },
      });

      if (!parentDept) {
        throw new BadRequestException('父部门不存在');
      }
    }

    return await this.prisma.sys_department.create({
      data: createDeptDto,
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            users: true,
            children: true,
          },
        },
      },
    });
  }

  /**
   * 获取所有部门（树形结构）
   */
  async findAll() {
    const departments = await this.prisma.sys_department.findMany({
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            users: true,
            children: true,
          },
        },
      },
      orderBy: {
        sort: 'asc',
      },
    });

    // 构建树形结构
    return this.buildDepartmentTree(departments);
  }

  /**
   * 获取部门列表（平铺）
   */
  async findList() {
    return await this.prisma.sys_department.findMany({
      include: {
        parent: true,
        _count: {
          select: {
            users: true,
            children: true,
          },
        },
      },
      orderBy: {
        sort: 'asc',
      },
    });
  }

  /**
   * 分页查询部门
   */
  async findMany(queryDto: QueryDeptDto) {
    const { page, size, name, code, status, parent_id } = queryDto;
    const skip = PaginationHelper.getSkip(page, size);

    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }
    if (code) {
      where.code = { contains: code };
    }
    if (status !== undefined) {
      where.status = status;
    }
    if (parent_id) {
      where.parent_id = parent_id;
    }

    const [data, total] = await Promise.all([
      this.prisma.sys_department.findMany({
        where,
        skip,
        take: size,
        include: {
          parent: true,
          _count: {
            select: {
              users: true,
              children: true,
            },
          },
        },
        orderBy: {
          sort: 'asc',
        },
      }),
      this.prisma.sys_department.count({ where }),
    ]);

    return PaginationHelper.createResult(data, total, page, size);
  }

  /**
   * 根据ID获取部门详情
   */
  async findOne(uid: string) {
    const department = await this.prisma.sys_department.findUnique({
      where: { uid },
      include: {
        parent: true,
        children: true,
        users: {
          select: {
            uid: true,
            name: true,
            account: true,
            email: true,
            phone: true,
            avatar: true,
            status: true,
          },
        },
        _count: {
          select: {
            users: true,
            children: true,
          },
        },
      },
    });

    if (!department) {
      throw new NotFoundException('部门不存在');
    }

    return department;
  }

  /**
   * 更新部门
   */
  async update(uid: string, updateDeptDto: UpdateDeptDto) {
    const { name, code, parent_id, ...data } = updateDeptDto;

    // 检查部门是否存在
    const existingDept = await this.prisma.sys_department.findUnique({
      where: { uid },
    });
    if (!existingDept) {
      throw new NotFoundException('部门不存在');
    }

    // 检查部门名称是否已被其他部门使用
    if (name && name !== existingDept.name) {
      const existingName = await this.prisma.sys_department.findUnique({
        where: { name },
      });
      if (existingName) {
        throw new ConflictException('部门名称已存在');
      }
    }

    // 检查部门编码是否已被其他部门使用
    if (code && code !== existingDept.code) {
      const existingCode = await this.prisma.sys_department.findUnique({
        where: { code },
      });
      if (existingCode) {
        throw new ConflictException('部门编码已存在');
      }
    }

    // 如果要设置父部门，检查父部门是否存在且不能设置为自己或自己的子部门
    if (parent_id) {
      if (parent_id === uid) {
        throw new ConflictException('不能将自己设置为父部门');
      }

      const parentDept = await this.prisma.sys_department.findUnique({
        where: { uid: parent_id },
      });
      if (!parentDept) {
        throw new NotFoundException('父部门不存在');
      }

      // 检查是否会形成循环引用
      const isCircular = await this.checkCircularReference(uid, parent_id);
      if (isCircular) {
        throw new ConflictException('不能将子部门设置为父部门');
      }
    }

    return await this.prisma.sys_department.update({
      where: { uid },
      data: {
        name,
        code,
        parent_id,
        ...data,
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            users: true,
            children: true,
          },
        },
      },
    });
  }

  /**
   * 删除部门
   */
  async remove(uid: string) {
    const department = await this.prisma.sys_department.findUnique({
      where: { uid },
      include: {
        children: true,
        users: true,
      },
    });

    if (!department) {
      throw new NotFoundException('部门不存在');
    }

    // 检查是否有子部门
    if (department.children.length > 0) {
      throw new ConflictException('该部门下还有子部门，无法删除');
    }

    // 检查是否有用户
    if (department.users.length > 0) {
      throw new ConflictException('该部门下还有用户，无法删除');
    }

    await this.prisma.sys_department.delete({
      where: { uid },
    });

    return { message: '删除成功' };
  }

  /**
   * 构建部门树形结构
   */
  private buildDepartmentTree(departments: any[]) {
    const departmentMap = new Map<string, any>();
    const rootDepartments: any[] = [];

    // 创建部门映射
    departments.forEach(dept => {
      departmentMap.set(dept.uid, { ...dept, children: [] });
    });

    // 构建树形结构
    departments.forEach(dept => {
      const deptNode = departmentMap.get(dept.uid);
      if (dept.parent_id) {
        const parent = departmentMap.get(dept.parent_id);
        if (parent) {
          parent.children.push(deptNode);
        }
      } else {
        rootDepartments.push(deptNode);
      }
    });

    return rootDepartments;
  }

  /**
   * 检查循环引用
   */
  private async checkCircularReference(deptId: string, parentId: string): Promise<boolean> {
    let currentParentId = parentId;

    while (currentParentId) {
      if (currentParentId === deptId) {
        return true;
      }

      const parent = await this.prisma.sys_department.findUnique({
        where: { uid: currentParentId },
        select: { parent_id: true },
      });

      if (!parent || !parent.parent_id) {
        break;
      }

      currentParentId = parent.parent_id;
    }

    return false;
  }
}
