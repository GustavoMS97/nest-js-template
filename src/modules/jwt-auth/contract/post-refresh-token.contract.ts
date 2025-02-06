import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

class PostRefreshTokenInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Refresh token' })
  refresh_token: string
}

class PostRefreshTokenOutput {
  @ApiProperty({ description: 'Result access token' })
  access_token: string

  @ApiProperty({ description: 'Result refresh token' })
  refresh_token: string
}

function map(object: { access_token: string; refresh_token: string }): PostRefreshTokenOutput {
  return Object.assign(new PostRefreshTokenOutput(), object)
}

export { PostRefreshTokenInput, PostRefreshTokenOutput, map }
