import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CREATE_POWER, DELETE_POWER, SystemUserGuards, UPDATE_POWER, VIEW_POWER } from '@app/auth-power';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取所有用户', description: '获取系统中所有用户列表' })
  @ApiResponse({ status: 200, description: '成功获取用户列表' })
  @UseGuards(SystemUserGuards.AuthGuard([VIEW_POWER]))
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '分页查询用户', description: '根据条件分页查询用户列表' })
  @ApiQuery({ type: QueryUserDto, description: '查询条件' })
  @ApiResponse({ status: 200, description: '成功获取分页用户数据' })
  @UseGuards(SystemUserGuards.AuthGuard([VIEW_POWER]))
  @Get('list')
  findMany(@Query() queryDto: QueryUserDto) {
    return this.userService.findMany(queryDto);
  }

  @ApiOperation({ summary: '获取用户详情', description: '根据ID获取用户详细信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取用户详情' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([VIEW_POWER]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '创建用户', description: '创建新的用户' })
  @ApiBody({ type: CreateUserDto, description: '用户创建信息' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @UseGuards(SystemUserGuards.AuthGuard([CREATE_POWER]))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '更新用户', description: '根据ID更新用户信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiBody({ type: UpdateUserDto, description: '用户更新信息' })
  @ApiResponse({ status: 200, description: '用户更新成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([UPDATE_POWER]))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户', description: '根据ID删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([DELETE_POWER]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: '分配角色给用户', description: '为用户分配角色' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiBody({ schema: { type: 'object', properties: { roleIds: { type: 'array', items: { type: 'string' }, description: '角色ID数组' } } } })
  @ApiResponse({ status: 200, description: '角色分配成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([UPDATE_POWER]))
  @Post(':id/roles')
  assignRoles(@Param('id') id: string, @Body() body: { roleIds: string[] }) {
    return this.userService.assignRoles(id, body.roleIds);
  }

  @ApiOperation({ summary: '获取用户角色', description: '获取用户拥有的角色列表' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取用户角色列表' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([VIEW_POWER]))
  @Get(':id/roles')
  getUserRoles(@Param('id') id: string) {
    return this.userService.getUserRoles(id);
  }

  @ApiOperation({ summary: '禁用用户菜单', description: '为用户禁用特定菜单' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiBody({ schema: { type: 'object', properties: { menuIds: { type: 'array', items: { type: 'string' }, description: '菜单ID数组' } } } })
  @ApiResponse({ status: 200, description: '菜单禁用成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([UPDATE_POWER]))
  @Post(':id/ban-menus')
  banMenus(@Param('id') id: string, @Body() body: { menuIds: string[] }) {
    return this.userService.banMenus(id, body.menuIds);
  }

  @ApiOperation({ summary: '获取用户禁用菜单', description: '获取用户被禁用的菜单列表' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取用户禁用菜单列表' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemUserGuards.AuthGuard([VIEW_POWER]))
  @Get(':id/banned-menus')
  getUserBannedMenus(@Param('id') id: string) {
    return this.userService.getUserBannedMenus(id);
  }
}
