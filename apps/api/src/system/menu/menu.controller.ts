import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CREATE_POWER, DELETE_POWER, SystemMenuGuards, UPDATE_POWER, VIEW_POWER } from '@app/auth-power';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '获取菜单树形结构', description: '获取所有菜单的树形结构数据' })
  @ApiResponse({ status: 200, description: '成功获取菜单树形结构' })
  @UseGuards(SystemMenuGuards.AuthGuard([VIEW_POWER]))
  @Get('tree')
  findAll() {
    return this.menuService.findAll();
  }

  @ApiOperation({ summary: '分页查询菜单', description: '根据条件分页查询菜单列表' })
  @ApiQuery({ type: QueryMenuDto, description: '查询条件' })
  @ApiResponse({ status: 200, description: '成功获取分页菜单数据' })
  @UseGuards(SystemMenuGuards.AuthGuard([VIEW_POWER]))
  @Get('list')
  findMany(@Query() queryDto: QueryMenuDto) {
    return this.menuService.findMany(queryDto);
  }

  @ApiOperation({ summary: '获取菜单详情', description: '根据ID获取菜单详细信息' })
  @ApiParam({ name: 'id', description: '菜单ID' })
  @ApiResponse({ status: 200, description: '成功获取菜单详情' })
  @ApiResponse({ status: 404, description: '菜单不存在' })
  @UseGuards(SystemMenuGuards.AuthGuard([VIEW_POWER]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @ApiOperation({ summary: '创建菜单', description: '创建新的菜单项' })
  @ApiBody({ type: CreateMenuDto, description: '菜单创建信息' })
  @ApiResponse({ status: 201, description: '菜单创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @UseGuards(SystemMenuGuards.AuthGuard([CREATE_POWER]))
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({ summary: '更新菜单', description: '根据ID更新菜单信息' })
  @ApiParam({ name: 'id', description: '菜单ID' })
  @ApiBody({ type: UpdateMenuDto, description: '菜单更新信息' })
  @ApiResponse({ status: 200, description: '菜单更新成功' })
  @ApiResponse({ status: 404, description: '菜单不存在' })
  @UseGuards(SystemMenuGuards.AuthGuard([UPDATE_POWER]))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @ApiOperation({ summary: '删除菜单', description: '根据ID删除菜单' })
  @ApiParam({ name: 'id', description: '菜单ID' })
  @ApiResponse({ status: 200, description: '菜单删除成功' })
  @ApiResponse({ status: 404, description: '菜单不存在' })
  @UseGuards(SystemMenuGuards.AuthGuard([DELETE_POWER]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
