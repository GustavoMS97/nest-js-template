import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Result list', type: () => Object })
  items: T[]

  @ApiProperty({
    description: 'Pagination info',
    example: { total: 100, page: 1, limit: 10, totalPages: 10 }
  })
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }

  constructor(items: T[], total: number, page: number, limit: number) {
    this.items = items
    this.pagination = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}
