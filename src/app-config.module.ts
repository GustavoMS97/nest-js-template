import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvironmentConfig } from '@app/@config/environment.config'
import { validate } from '@app/modules/helpers/validate-environment-variables.helper'
import { typeOrmConfig } from '@app/@config/typeorm.config'
import { LoggerModule } from '@app/modules/logger/logger.module'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate, isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig), LoggerModule],
  providers: [EnvironmentConfig],
  exports: [EnvironmentConfig]
})
export class AppConfigModule {}
