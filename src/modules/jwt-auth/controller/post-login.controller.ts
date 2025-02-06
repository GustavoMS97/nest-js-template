import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { BadRequestError, InternalServerError, UnauthorizedError } from '@app/modules/@shared/errors/nest-swagger-http.error'
import { PostLoginAction } from '@app/modules/jwt-auth/action/post-login.action'
import { PostLoginInput, PostLoginOutput } from '@app/modules/jwt-auth/contract/post-login.contract'

@ApiTags('Authentication')
@Controller('/auth/login')
export class PostLoginController {
  constructor(private handler: PostLoginAction) {}

  @ApiOperation({
    operationId: 'PostLogin',
    summary: 'Authenticate user'
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
    type: PostLoginOutput
  })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async handle(@Body() input: PostLoginInput): Promise<PostLoginOutput> {
    return await this.handler.handle(input)
  }
}
