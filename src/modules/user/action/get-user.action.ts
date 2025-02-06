import { Inject, Injectable } from '@nestjs/common'

import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { GetUserOutput, map } from '@app/modules/user/contract/get-user.contract'

@Injectable()
export class GetUserAction {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async handle(): Promise<GetUserOutput[]> {
    this.logger.log('Fetching user info')
    const users = await this.userRepository.find({}, undefined, undefined, { name: 'ASC' })
    if (!users?.length) {
      return []
    }
    this.logger.log('Users found', { users })
    return users.map((user) => map(user))
  }
}
