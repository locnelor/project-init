import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { FileService } from './file.service';
import { CREATE_POWER, DELETE_POWER, SystemFileGuards, UPDATE_POWER, VIEW_POWER } from '@app/auth-power';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { QueryFileDto } from './dto/query-file.dto';

@ApiTags('文件管理')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '获取所有文件', description: '获取系统中所有文件列表' })
  @ApiResponse({ status: 200, description: '成功获取文件列表' })
  @UseGuards(SystemFileGuards.AuthGuard([VIEW_POWER]))
  @Get('all')
  findAll() {
    return this.fileService.findAll();
  }

  @ApiOperation({ summary: '分页查询文件', description: '根据条件分页查询文件列表' })
  @ApiQuery({ type: QueryFileDto, description: '查询条件' })
  @ApiResponse({ status: 200, description: '成功获取分页文件数据' })
  @UseGuards(SystemFileGuards.AuthGuard([VIEW_POWER]))
  @Get('list')
  findMany(@Query() queryDto: QueryFileDto) {
    return this.fileService.findMany(queryDto);
  }

  @ApiOperation({ summary: '获取文件详情', description: '根据ID获取文件详细信息' })
  @ApiParam({ name: 'id', description: '文件ID' })
  @ApiResponse({ status: 200, description: '成功获取文件详情' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @UseGuards(SystemFileGuards.AuthGuard([VIEW_POWER]))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @ApiOperation({ summary: '创建文件记录', description: '创建新的文件记录' })
  @ApiBody({ type: CreateFileDto, description: '文件创建信息' })
  @ApiResponse({ status: 201, description: '文件记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @UseGuards(SystemFileGuards.AuthGuard([CREATE_POWER]))
  @Post()
  create(@Body() createFileDto: CreateFileDto, @Body('userId') userId?: string) {
    return this.fileService.create(createFileDto, userId);
  }

  @ApiOperation({ summary: '更新文件信息', description: '根据ID更新文件信息' })
  @ApiParam({ name: 'id', description: '文件ID' })
  @ApiBody({ type: UpdateFileDto, description: '文件更新信息' })
  @ApiResponse({ status: 200, description: '文件更新成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @UseGuards(SystemFileGuards.AuthGuard([UPDATE_POWER]))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }

  @ApiOperation({ summary: '删除文件', description: '根据ID删除文件记录' })
  @ApiParam({ name: 'id', description: '文件ID' })
  @ApiResponse({ status: 200, description: '文件删除成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @UseGuards(SystemFileGuards.AuthGuard([DELETE_POWER]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }

  @ApiOperation({ summary: '分配文件给用户', description: '将文件分配给指定用户' })
  @ApiParam({ name: 'id', description: '文件ID' })
  @ApiBody({ schema: { type: 'object', properties: { userId: { type: 'string', description: '用户ID' } } } })
  @ApiResponse({ status: 200, description: '文件分配成功' })
  @ApiResponse({ status: 404, description: '文件或用户不存在' })
  @UseGuards(SystemFileGuards.AuthGuard([UPDATE_POWER]))
  @Post(':id/assign-user')
  assignToUser(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.fileService.assignToUser(id, body.userId);
  }

  @ApiOperation({ summary: '移除用户文件关联', description: '移除文件与用户的关联关系' })
  @ApiParam({ name: 'id', description: '文件ID' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '关联移除成功' })
  @ApiResponse({ status: 404, description: '关联关系不存在' })
  @UseGuards(SystemFileGuards.AuthGuard([UPDATE_POWER]))
  @Delete(':id/user/:userId')
  removeFromUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.fileService.removeFromUser(id, userId);
  }

  @ApiOperation({ summary: '获取用户文件', description: '获取指定用户关联的所有文件' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取用户文件列表' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @UseGuards(SystemFileGuards.AuthGuard([VIEW_POWER]))
  @Get('user/:userId')
  getUserFiles(@Param('userId') userId: string) {
    return this.fileService.getUserFiles(userId);
  }
}
