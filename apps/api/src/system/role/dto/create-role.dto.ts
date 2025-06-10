import { IsString, IsOptional, IsBoolean, IsInt, Min, IsIn } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort?: number = 10;

  @IsOptional()
  @IsBoolean()
  status?: boolean = true;

  @IsOptional()
  @IsString()
  @IsIn(['ALL', 'DEPT', 'DEPT_AND_CHILD', 'SELF', 'CUSTOM'])
  data_scope?: string = 'ALL';

  @IsOptional()
  @IsString()
  comment?: string;
}