import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'

import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { GetUserOutput, map } from '@app/modules/user/contract/get-user.contract'
import { JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'

@Injectable()
export class GetUserMeAction {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async handle(auth: JwtTokenPayload): Promise<GetUserOutput> {
    this.logger.log('Fetching users own info', { auth: auth.user_id })
    const user = await this.userRepository.findOne({ id: auth.user_id })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }
    this.logger.log('User found', { user })
    return map(user)
  }
}
