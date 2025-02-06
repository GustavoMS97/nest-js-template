import { ApiProperty } from '@nestjs/swagger'

import { UserEntity } from '@app/modules/user/user.entity'

class GetUserOutput {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  email: string

  @ApiProperty({ description: 'User creator identifier' })
  created_by: number

  @ApiProperty({
    description: `Record creation date`,
    example: '2024-01-01T12:00:00Z'
  })
  created_at: Date

  @ApiProperty({
    description: `Record last update date`,
    example: '2024-01-02T15:30:00Z'
  })
  updated_at: Date
}

function map(entity: UserEntity): GetUserOutput {
  const { id, name, email, created_at, updated_at, created_by } = entity
  return Object.assign(new GetUserOutput(), { id, name, email, created_at, updated_at, created_by })
}

export { GetUserOutput, map }
