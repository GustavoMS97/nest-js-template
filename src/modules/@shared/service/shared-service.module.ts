import { Module } from '@nestjs/common'

import { AppConfigModule } from '@app/app-config.module'

@Module({
  imports: [AppConfigModule],
  providers: [],
  exports: []
})
export class SharedServiceModule {}
