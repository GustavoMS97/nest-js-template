import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { BadRequestError, InternalServerError, UnauthorizedError } from '@app/modules/@shared/errors/nest-swagger-http.error'
import { PostRefreshTokenAction } from '@app/modules/jwt-auth/action/post-refresh-token.action'
import { PostRefreshTokenInput, PostRefreshTokenOutput } from '@app/modules/jwt-auth/contract/post-refresh-token.contract'

@ApiTags('Authentication')
@Controller('/auth/refresh')
export class PostRefreshTokenController {
  constructor(private handler: PostRefreshTokenAction) {}

  @ApiOperation({
    operationId: 'PostRefreshToken',
    summary: 'Refresh user token'
  })
  @ApiBadRequestResponse({
    type: BadRequestError,
    description: 'Bad request response'
  })
  @ApiInternalServerErrorResponse({ type: InternalServerError, description: 'Internal error response' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError, description: 'Unauthorized error' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success response',
    type: PostRefreshTokenOutput
  })
  @Post('/')
  async handle(@Body() input: PostRefreshTokenInput): Promise<PostRefreshTokenOutput> {
    return await this.handler.handle(input)
  }
}
