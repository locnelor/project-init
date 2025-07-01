import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { QueryDeptDto } from './dto/query-dept.dto';
import { CREATE_POWER, DELETE_POWER, SystemDeptGuards, UPDATE_POWER, VIEW_POWER } from '@app/auth-power';

@ApiTags('部门管理')
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) { }

  /**
   * 获取部门树形结构
   */
  @ApiOperation({ summary: '获取部门树形结构', description: '获取所有部门的树形结构数据' })
  @ApiResponse({ status: 200, description: '成功获取部门树形结构' })
  @UseGuards(SystemDeptGuards.AuthGuard([VIEW_POWER]))
  @Get('tree')
  async findAll() {
    return await this.deptService.findAll();
  }

  /**
   * 获取部门列表（平铺）
   */
  @ApiOperation({ summary: '获取部门列表', description: '获取所有部门的平铺列表' })
  @ApiResponse({ status: 200, description: '成功获取部门列表' })
  @UseGuards(SystemDeptGuards.AuthGuard([VIEW_POWER]))
  @Get('all')
  async findList() {
    return await this.deptService.findList();
  }

  /**
   * 分页查询部门
   */
  @ApiOperation({ summary: '分页查询部门', description: '根据条件分页查询部门列表' })
  @ApiQuery({ type: QueryDeptDto, description: '查询条件' })
  @ApiResponse({ status: 200, description: '成功获取分页部门数据' })
  @UseGuards(SystemDeptGuards.AuthGuard([VIEW_POWER]))
  @Get('list')
  async findMany(@Query() queryDto: QueryDeptDto) {
    return await this.deptService.findMany(queryDto);
  }

  /**
   * 获取部门详情
   */
  @ApiOperation({ summary: '获取部门详情', description: '根据ID获取部门详细信息' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @ApiResponse({ status: 200, description: '成功获取部门详情' })
  @ApiResponse({ status: 404, description: '部门不存在' })
  @UseGuards(SystemDeptGuards.AuthGuard([VIEW_POWER]))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.deptService.findOne(id);
  }

  /**
   * 创建部门
   */
  @ApiOperation({ summary: '创建部门', description: '创建新的部门' })
  @ApiBody({ type: CreateDeptDto, description: '部门创建信息' })
  @ApiResponse({ status: 201, description: '部门创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @UseGuards(SystemDeptGuards.AuthGuard([CREATE_POWER]))
  @Post()
  async create(@Body() createDeptDto: CreateDeptDto) {
    return await this.deptService.create(createDeptDto);
  }

  /**
   * 更新部门
   */
  @ApiOperation({ summary: '更新部门', description: '根据ID更新部门信息' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @ApiBody({ type: UpdateDeptDto, description: '部门更新信息' })
  @ApiResponse({ status: 200, description: '部门更新成功' })
  @ApiResponse({ status: 404, description: '部门不存在' })
  @UseGuards(SystemDeptGuards.AuthGuard([UPDATE_POWER]))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return await this.deptService.update(id, updateDeptDto);
  }

  /**
   * 删除部门
   */
  @ApiOperation({ summary: '删除部门', description: '根据ID删除部门' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @ApiResponse({ status: 200, description: '部门删除成功' })
  @ApiResponse({ status: 404, description: '部门不存在' })
  @UseGuards(SystemDeptGuards.AuthGuard([DELETE_POWER]))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deptService.remove(id);
  }
}
