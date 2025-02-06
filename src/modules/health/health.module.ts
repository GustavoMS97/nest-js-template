import { Module } from '@nestjs/common'

import { GetHealthController } from '@app/modules/health/controller/get-health.controller'

@Module({
  controllers: [GetHealthController]
})
export class HealthModule {}
