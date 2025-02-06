import { Controller, Get, HttpStatus, UseGuards, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@app/modules/guards/jwt-auth.guard'
import { CustomRequest } from '@app/modules/@shared/interface/custom-request.interface'

@ApiTags('Health')
@Controller('/health')
export class GetHealthController {
  constructor() {}

  @ApiOperation({
    operationId: 'GetHealth',
    summary: 'Get system health'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success response'
  })
  @Get('/')
  handle(): { ok: true } {
    return { ok: true }
  }

  @ApiOperation({
    operationId: 'GetHealthAuthenticated',
    summary: 'Get system health and check token auth'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success response'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  @ApiBearerAuth()
  handleAuth(@Req() req: CustomRequest): { ok: true; user: unknown } {
    return { ok: true, user: req.user }
  }
}
