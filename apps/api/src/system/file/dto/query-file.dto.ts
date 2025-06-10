import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { MediaAccessType } from './create-file.dto';

export class QueryFileDto extends PaginationDto {
  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsString()
  original_name?: string;

  @IsOptional()
  @IsString()
  mime_type?: string;

  @IsOptional()
  @IsEnum(MediaAccessType)
  access_type?: MediaAccessType;

  @IsOptional()
  @IsString()
  user_id?: string;
}