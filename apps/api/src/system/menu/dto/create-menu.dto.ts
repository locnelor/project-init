import { IsString, IsOptional, IsBoolean, IsInt, Min, IsIn } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  component?: string;

  @IsOptional()
  @IsString()
  redirect?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort?: number = 10;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean = true;

  @IsOptional()
  @IsBoolean()
  status?: boolean = true;

  @IsOptional()
  @IsBoolean()
  cache?: boolean = false;

  @IsOptional()
  @IsString()
  @IsIn(['menu', 'button', 'iframe', 'link'])
  type?: string = 'menu';

  @IsOptional()
  @IsInt()
  @Min(0)
  permission?: number = 0;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsBoolean()
  frame?: boolean = false;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  parent_id?: string;
}