import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CREATE_POWER, DELETE_POWER, SystemRoleGuards, UPDATE_POWER, VIEW_POWER } from '@app/auth-power';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '获取所有角色', description: '获取系统中所有角色列表' })
  @ApiResponse({ status: 200, description: '成功获取角色列表' })
  @UseGuards(SystemRoleGuards.AuthGuard([VIEW_POWER]))
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: '分页查询角色', description: '根据条件分页查询角色列表' })
  @ApiQuery({ type: QueryRoleDto, description: '查询条件' })
  @ApiResponse({ status: 200, description: '成功获取分页角色数据' })
  @UseGuards(SystemRoleGuards.AuthGuard([VIEW_POWER]))
  @Get('list')
  findMany(@Query() queryDto: QueryRoleDto) {
    return this.roleService.findMany(queryDto);
  }

  @ApiOperation({ summary: '获取角色详情', description: '根据ID获取角色详细信息' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiResponse({ status: 200, description: '成功获取角色详情' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @UseGuards(SystemRoleGuards.AuthGuard([VIEW_POWER]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: '创建角色', description: '创建新的角色' })
  @ApiBody({ type: CreateRoleDto, description: '角色创建信息' })
  @ApiResponse({ status: 201, description: '角色创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @UseGuards(SystemRoleGuards.AuthGuard([CREATE_POWER]))
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: '更新角色', description: '根据ID更新角色信息' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiBody({ type: UpdateRoleDto, description: '角色更新信息' })
  @ApiResponse({ status: 200, description: '角色更新成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @UseGuards(SystemRoleGuards.AuthGuard([UPDATE_POWER]))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: '删除角色', description: '根据ID删除角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiResponse({ status: 200, description: '角色删除成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @UseGuards(SystemRoleGuards.AuthGuard([DELETE_POWER]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @ApiOperation({ summary: '分配菜单给角色', description: '为角色分配菜单权限' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiBody({ schema: { type: 'object', properties: { menuIds: { type: 'array', items: { type: 'string' }, description: '菜单ID数组' } } } })
  @ApiResponse({ status: 200, description: '菜单分配成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @UseGuards(SystemRoleGuards.AuthGuard([UPDATE_POWER]))
  @Post(':id/menus')
  assignMenus(@Param('id') id: string, @Body() body: { menuIds: string[] }) {
    return this.roleService.assignMenus(id, body.menuIds);
  }

  @ApiOperation({ summary: '获取角色菜单', description: '获取角色拥有的菜单权限' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiResponse({ status: 200, description: '成功获取角色菜单列表' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @UseGuards(SystemRoleGuards.AuthGuard([VIEW_POWER]))
  @Get(':id/menus')
  getRoleMenus(@Param('id') id: string) {
    return this.roleService.getRoleMenus(id);
  }
}
