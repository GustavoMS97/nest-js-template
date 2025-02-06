import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { map } from '@app/modules/jwt-auth/contract/post-login.contract'
import checkRawInput from '@app/modules/helpers/check-raw-input.helper'
import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import { JwtRefreshTokenPayload, JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'
import { PostRefreshTokenInput, PostRefreshTokenOutput } from '@app/modules/jwt-auth/contract/post-refresh-token.contract'
import { JwtAuthService } from '@app/modules/jwt-auth/service/jwt-auth.service'

@Injectable()
export class PostRefreshTokenAction {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async handle(rawInput: PostRefreshTokenInput): Promise<PostRefreshTokenOutput> {
    this.logger.log('Refreshing user token')
    const input = await checkRawInput(PostRefreshTokenInput, rawInput)

    const refreshTokenPayload = this.jwtAuthService.verifyToken<JwtRefreshTokenPayload>(input.refresh_token)
    if (!refreshTokenPayload.refresh) {
      this.logger.warn('Using access token to refresh, unauthorized')
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    const payload: JwtTokenPayload = { user_id: refreshTokenPayload.user_id }
    const tokens = this.jwtAuthService.createJwtToken(payload)
    return map(tokens)
  }
}
