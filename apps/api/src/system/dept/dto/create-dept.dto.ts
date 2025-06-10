import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateDeptDto {
  @IsNotEmpty({ message: '部门名称不能为空' })
  @IsString({ message: '部门名称必须是字符串' })
  name: string;

  @IsNotEmpty({ message: '部门编码不能为空' })
  @IsString({ message: '部门编码必须是字符串' })
  code: string;

  @IsOptional()
  @IsInt({ message: '排序必须是整数' })
  @Min(0, { message: '排序不能小于0' })
  sort?: number;

  @IsOptional()
  @IsBoolean({ message: '状态必须是布尔值' })
  status?: boolean;

  @IsOptional()
  @IsString({ message: '备注必须是字符串' })
  comment?: string;

  @IsOptional()
  @IsString({ message: '父部门ID必须是字符串' })
  parent_id?: string;
}