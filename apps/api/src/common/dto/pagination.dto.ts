import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  size : number = 10;
}

export interface PaginationResult<T> {
  page: number;
  size: number;
  total: number;
  data: T[];
}

export class PaginationHelper {
  static createResult<T>(data: T[], total: number, page: number, size: number): PaginationResult<T> {
    return {
      page,
      size,
      total,
      data,
    };
  }

  static getSkip(page: number, size: number): number {
    return (page - 1) * size;
  }
}