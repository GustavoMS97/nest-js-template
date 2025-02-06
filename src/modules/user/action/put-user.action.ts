import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Not } from 'typeorm'
import { hash } from 'bcrypt'

import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import checkRawInput from '@app/modules/helpers/check-raw-input.helper'
import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'
import { PutUserInput, PutUserOutput, map } from '@app/modules/user/contract/put-user.contract'
import { UserEntity } from '@app/modules/user/user.entity'

@Injectable()
export class PutUserAction {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async handle(rawInput: PutUserInput, auth: JwtTokenPayload): Promise<PutUserOutput> {
    this.logger.log('Updating user info', { rawInput, user: auth.user_id })
    const input = await checkRawInput(PutUserInput, rawInput)

    if (input.email) {
      const userEmailCheck = await this.userRepository.findOne({ email: input.email, id: Not(auth.user_id) }, ['id'])
      if (userEmailCheck) {
        throw new HttpException('Email already exists', HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }

    if (input.password) {
      const hashedPassword = await hash(input.password, 10)
      input.password = hashedPassword
    }

    await this.userRepository.updateById(auth.user_id, input)
    const user = (await this.userRepository.findOne({ id: auth.user_id })) as UserEntity

    return map(user)
  }
}
