import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { InternalServerError, UnauthorizedError } from '@app/modules/@shared/errors/nest-swagger-http.error'
import { JwtAuthGuard } from '@app/modules/guards/jwt-auth.guard'
import { GetUserAction } from '@app/modules/user/action/get-user.action'
import { GetUserOutput } from '@app/modules/user/contract/get-user.contract'

@ApiTags('User')
@Controller('/user')
@ApiBearerAuth()
export class GetUserController {
  constructor(private handler: GetUserAction) {}

  @ApiOperation({
    operationId: 'GetUser',
    summary: 'Fetch users info'
  })
  @ApiInternalServerErrorResponse({ type: InternalServerError, description: 'Internal error response' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError, description: 'Unauthorized error' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success response',
    type: [GetUserOutput]
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async handle(): Promise<GetUserOutput[]> {
    return await this.handler.handle()
  }
}
