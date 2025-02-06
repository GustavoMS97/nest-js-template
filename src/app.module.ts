import 'reflect-metadata'

import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { AppConfigModule } from '@app/app-config.module'
import { GuardsModule } from '@app/modules/guards/guards.module'
import { HealthModule } from '@app/modules/health/health.module'
import { JwtAuthModule } from '@app/modules/jwt-auth/jwt-auth.module'
import { UserModule } from '@app/modules/user/user.module'
import { SeedModule } from '@app/modules/seed/seed.module'

const modules = [HealthModule, JwtAuthModule, SeedModule, UserModule]

@Module({
  imports: [HttpModule, AppConfigModule, GuardsModule, ...modules],
  controllers: [],
  providers: []
})
export class AppModule {}
