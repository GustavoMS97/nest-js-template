import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

class PostLoginInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'User password' })
  password: string
}

class PostLoginOutput {
  @ApiProperty({ description: 'Result access token' })
  access_token: string

  @ApiProperty({ description: 'Result refresh token' })
  refresh_token: string
}

function map(object: { access_token: string; refresh_token: string }): PostLoginOutput {
  return Object.assign(new PostLoginOutput(), object)
}

export { PostLoginInput, PostLoginOutput, map }
