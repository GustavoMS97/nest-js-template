import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'

import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { PostLoginInput, PostLoginOutput, map } from '@app/modules/jwt-auth/contract/post-login.contract'
import checkRawInput from '@app/modules/helpers/check-raw-input.helper'
import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import { JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'
import { JwtAuthService } from '@app/modules/jwt-auth/service/jwt-auth.service'

@Injectable()
export class PostLoginAction {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly jwtAuthService: JwtAuthService,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly usersRepository: UserRepositoryInterface
  ) {}

  async handle(rawInput: PostLoginInput): Promise<PostLoginOutput> {
    this.logger.log(`Authenticating user ${rawInput.email}`, { rawInput })
    const input = await checkRawInput(PostLoginInput, rawInput)
    const user = await this.usersRepository.findOne({ email: input.email }, ['password', 'id'])
    if (!user) {
      this.logger.warn(`No user found for email ${input.email}`)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    const passwordComparison = await compare(input.password, user.password)
    if (!passwordComparison) {
      this.logger.warn(`Invalid password`)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    const payload: JwtTokenPayload = { user_id: user.id }
    const tokens = this.jwtAuthService.createJwtToken(payload)
    return map(tokens)
  }
}
