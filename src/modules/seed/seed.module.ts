import { Module } from '@nestjs/common'

import { UserModule } from '@app/modules/user/user.module'
import { PostSuperAdminAction } from '@app/modules/seed/action/post-super-admin.action'
import { PostUserAdminController } from '@app/modules/seed/controller/post-user-admin.controller'

@Module({
  imports: [UserModule],
  providers: [PostSuperAdminAction],
  exports: [],
  controllers: [PostUserAdminController]
})
export class SeedModule {}
