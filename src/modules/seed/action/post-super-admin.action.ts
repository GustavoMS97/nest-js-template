import { Inject, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { EnvironmentConfig } from '@app/@config/environment.config'
import { UserEntity } from '@app/modules/user/user.entity'

@Injectable()
export class PostSuperAdminAction {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly environmentConfig: EnvironmentConfig,
    @Inject(PROVIDER.USER_REPOSITORY)
    private readonly usersRepository: UserRepositoryInterface
  ) {}

  async handle(): Promise<void> {
    this.logger.log('Seeding super admin')
    const checkAdmin = await this.usersRepository.findOne({ email: this.environmentConfig.config.SUPER_ADMIN_EMAIL })
    if (checkAdmin) {
      this.logger.log('Super admin already seeded, no further action')
      return
    }
    const hashedPassword = await hash(this.environmentConfig.config.SUPER_ADMIN_PASSWORD, 10)
    const userEntity = new UserEntity()
    userEntity.name = 'Super Admin'
    userEntity.email = this.environmentConfig.config.SUPER_ADMIN_EMAIL
    userEntity.password = hashedPassword
    await this.usersRepository.create(userEntity)
    this.logger.log('Super admin seeded')
  }
}
