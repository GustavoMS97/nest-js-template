import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import checkRawInput from '@app/modules/helpers/check-raw-input.helper'
import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { PostUserInput, PostUserOutput, map } from '@app/modules/user/contract/post-user.contract'
import { UserEntity } from '@app/modules/user/user.entity'
import { JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'

@Injectable()
export class PostUserAction {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async handle(rawInput: PostUserInput, auth: JwtTokenPayload): Promise<PostUserOutput> {
    this.logger.log('Creating user info', { rawInput })
    const input = await checkRawInput(PostUserInput, rawInput)

    const userEmailCheck = await this.userRepository.findOne({ email: input.email }, ['id'])
    if (userEmailCheck) {
      throw new HttpException('Email already exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const entity = await this.buildEntity(input, auth.user_id)
    const user = await this.userRepository.create(entity)
    const userForLog: Omit<UserEntity, 'password'> = user
    this.logger.log('User created', { user: userForLog })

    return map(user)
  }

  private async buildEntity(input: PostUserInput, creator: number): Promise<UserEntity> {
    const entity = new UserEntity()
    entity.name = input.name
    entity.email = input.email
    const hashedPassword = await hash(input.password, 10)
    entity.password = hashedPassword
    entity.created_by = creator
    return entity
  }
}
