import { sys_media_access_type } from '@pkg/database';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export enum MediaAccessType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  ROLE = 'ROLE',
  USER = 'USER',
  DEPARTMENT = 'DEPARTMENT',
}

export class CreateFileDto {
  @IsString()
  filename: string;

  @IsString()
  original_name: string;

  @IsString()
  mime_type: string;

  @IsNumber()
  size: number;

  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsEnum(MediaAccessType)
  access_type?: sys_media_access_type = MediaAccessType.PRIVATE;

  @IsOptional()
  @IsString()
  description?: string;
}