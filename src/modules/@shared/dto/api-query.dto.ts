import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class ApiQueryDto {
  @ApiPropertyOptional({ description: 'Page number for pagination', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1

  @ApiPropertyOptional({ description: 'Limit of items per page', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10

  @ApiPropertyOptional({ description: 'Search query string', example: 'John Doe' })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({ description: 'Field to sort by', example: 'created_at' })
  @IsOptional()
  @IsString()
  orderBy?: string

  @ApiPropertyOptional({
    description: 'Sorting direction',
    enum: OrderDirection,
    example: OrderDirection.ASC
  })
  @IsEnum(OrderDirection)
  orderDirection: OrderDirection = OrderDirection.ASC
}
