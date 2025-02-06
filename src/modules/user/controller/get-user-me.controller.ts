import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { InternalServerError, UnauthorizedError } from '@app/modules/@shared/errors/nest-swagger-http.error'
import { JwtAuthGuard } from '@app/modules/guards/jwt-auth.guard'
import { GetUserOutput } from '@app/modules/user/contract/get-user.contract'
import { GetUserMeAction } from '@app/modules/user/action/get-user-me.action'
import { CustomRequest } from '@app/modules/@shared/interface/custom-request.interface'

@ApiTags('User')
@Controller('/user/me')
@ApiBearerAuth()
export class GetUserMeController {
  constructor(private handler: GetUserMeAction) {}

  @ApiOperation({
    operationId: 'GetUserMe',
    summary: 'Fetch user own info'
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedError, description: 'Unauthorized error' })
  @ApiInternalServerErrorResponse({ type: InternalServerError, description: 'Internal error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success response',
    type: GetUserOutput
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async handle(@Req() req: CustomRequest): Promise<GetUserOutput> {
    return await this.handler.handle(req.user)
  }
}
