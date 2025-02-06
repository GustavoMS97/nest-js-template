import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { JwtRefreshTokenPayload, JwtTokenPayload, JwtTokenResult } from '@app/modules/jwt-auth/jwt-auth.interface'
import { EnvironmentConfig } from '@app/@config/environment.config'
import CustomLoggerService from '@app/modules/logger/custom-logger.service'

@Injectable()
export class JwtAuthService {
  private readonly REFRESH_TOKEN_EXPIRATION: number
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: CustomLoggerService,
    environmentConfig: EnvironmentConfig
  ) {
    this.REFRESH_TOKEN_EXPIRATION = environmentConfig.config.JWT_EXPIRES_IN_SECONDS * 10
  }

  createJwtToken(payload: JwtTokenPayload): JwtTokenResult {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign({ ...payload, refresh: true } as JwtRefreshTokenPayload, {
        expiresIn: this.REFRESH_TOKEN_EXPIRATION
      })
    }
  }

  verifyToken<T extends JwtTokenPayload>(token: string): T {
    try {
      const payload = this.jwtService.verify<T>(token)
      return payload
    } catch (error) {
      this.logger.log('Error verifying token')
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }
}
