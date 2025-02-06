import { Controller, Post } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

import { PostSuperAdminAction } from '@app/modules/seed/action/post-super-admin.action'

@Controller('/seed/user-admin')
export class PostUserAdminController {
  constructor(private handler: PostSuperAdminAction) {}

  @Post('/')
  @ApiExcludeEndpoint()
  async handle(): Promise<void> {
    return await this.handler.handle()
  }
}
