import { Body, Controller, HttpStatus, Put, Req, UseGuards } from '@nestjs/common'
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
import { JwtAuthGuard } from '@app/modules/guards/jwt-auth.guard'
import { CustomRequest } from '@app/modules/@shared/interface/custom-request.interface'
import { PutUserAction } from '@app/modules/user/action/put-user.action'
import { PutUserInput, PutUserOutput } from '@app/modules/user/contract/put-user.contract'

@ApiTags('User')
@Controller('/user')
@ApiBearerAuth()
export class PutUserController {
  constructor(private handler: PutUserAction) {}

  @ApiOperation({
    operationId: 'PutUser',
    summary: 'Update user info'
  })
  @ApiBadRequestResponse({
    type: BadRequestError,
    description: 'Bad request response'
  })
  @ApiInternalServerErrorResponse({ type: InternalServerError, description: 'Internal error response' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError, description: 'Unauthorized error' })
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityError, description: 'Unprocessable entity response' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success response',
    type: PutUserOutput
  })
  @UseGuards(JwtAuthGuard)
  @Put('/')
  async handle(@Body() input: PutUserInput, @Req() req: CustomRequest): Promise<PutUserOutput> {
    return await this.handler.handle(input, req.user)
  }
}
