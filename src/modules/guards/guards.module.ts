import { Module } from '@nestjs/common'

import { AppConfigModule } from '@app/app-config.module'
import { JwtAuthGuard } from '@app/modules/guards/jwt-auth.guard'

@Module({
  imports: [AppConfigModule],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class GuardsModule {}
