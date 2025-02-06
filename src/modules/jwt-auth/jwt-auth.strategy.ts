import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EnvironmentConfig } from '@app/@config/environment.config'
import { JwtRefreshTokenPayload, JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'
import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly usersRepository: UserRepositoryInterface,
    environmentConfig: EnvironmentConfig
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfig.config.JWT_SECRET
    })
  }

  async validate(payload: JwtRefreshTokenPayload): Promise<JwtTokenPayload> {
    if (payload.refresh) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    const user = await this.usersRepository.findOne({ id: payload.user_id }, ['id'])
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return { user_id: payload.user_id } as JwtTokenPayload
  }
}
