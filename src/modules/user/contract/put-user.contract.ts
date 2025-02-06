import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator'

import { UserEntity } from '@app/modules/user/user.entity'
import { GetUserOutput } from '@app/modules/user/contract/get-user.contract'

class PutUserInput {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name?: string

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  email?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User password', example: 'SecurePassword123!' })
  password?: string
}

class PutUserOutput extends GetUserOutput {}

function map(entity: UserEntity): PutUserOutput {
  const { id, name, email, created_at, updated_at, created_by } = entity
  return Object.assign(new PutUserOutput(), { id, name, email, created_at, updated_at, created_by })
}

export { PutUserInput, PutUserOutput, map }
