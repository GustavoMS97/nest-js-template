import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  UnprocessableEntityError
} from '@app/modules/@shared/errors/nest-swagger-http.error'
import { PostUserInput, PostUserOutput } from '@app/modules/user/contract/post-user.contract'
import { JwtAuthGuard } from '@app/modules/guards/jwt-auth.guard'
import { CustomRequest } from '@app/modules/@shared/interface/custom-request.interface'
import { PostUserAction } from '@app/modules/user/action/post-user.action'

@ApiTags('User')
@Controller('/user')
@ApiBearerAuth()
export class PostUserController {
  constructor(private handler: PostUserAction) {}

  @ApiOperation({
    operationId: 'PostUser',
    summary: 'Create user info'
  })
  @ApiBadRequestResponse({
    type: BadRequestError,
    description: 'Bad request response'
  })
  @ApiInternalServerErrorResponse({ type: InternalServerError, description: 'Internal error response' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError, description: 'Unauthorized error' })
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityError, description: 'Unprocessable entity response' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success response',
    type: PostUserOutput
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async handle(@Body() input: PostUserInput, @Req() req: CustomRequest): Promise<PostUserOutput> {
    return await this.handler.handle(input, req.user)
  }
}
