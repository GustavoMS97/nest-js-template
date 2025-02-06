import { Global, Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'

import { createWinstonConfig } from '@app/modules/logger/winston.config'
import CustomLoggerService from '@app/modules/logger/custom-logger.service'
import { EnvironmentConfig } from '@app/@config/environment.config'

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [EnvironmentConfig],
      useFactory: (environmentConfig: EnvironmentConfig) => createWinstonConfig(environmentConfig)
    })
  ],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService]
})
export class LoggerModule {}
