import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PROVIDER } from '@app/modules/@shared/enum/provider.enum'
import { UserEntity } from '@app/modules/user/user.entity'
import UserRepository from '@app/modules/user/user.repository'
import { PostUserController } from '@app/modules/user/controller/post-user.controller'
import { PostUserAction } from '@app/modules/user/action/post-user.action'
import { GetUserController } from '@app/modules/user/controller/get-user.controller'
import { GetUserAction } from '@app/modules/user/action/get-user.action'
import { PutUserController } from '@app/modules/user/controller/put-user.controller'
import { PutUserAction } from '@app/modules/user/action/put-user.action'
import { GetUserMeController } from '@app/modules/user/controller/get-user-me.controller'
import { GetUserMeAction } from '@app/modules/user/action/get-user-me.action'

const RepositoryClass = { provide: PROVIDER.USER_REPOSITORY, useClass: UserRepository }

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [RepositoryClass, PostUserAction, GetUserAction, PutUserAction, GetUserMeAction],
  exports: [RepositoryClass],
  controllers: [PostUserController, GetUserController, PutUserController, GetUserMeController]
})
export class UserModule {}
