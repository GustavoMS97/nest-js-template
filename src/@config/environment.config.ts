import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvironmentVariablesDto, NODE_ENV } from '@app/modules/@shared/dto/environment-variables.dto'

@Injectable()
export class EnvironmentConfig {
  private readonly envConfig: EnvironmentVariablesDto

  constructor(private configService: ConfigService) {
    this.envConfig = this.loadConfig()
  }

  get config(): EnvironmentVariablesDto {
    return this.envConfig
  }

  private loadConfig(): EnvironmentVariablesDto {
    const environment = new EnvironmentVariablesDto()
    environment.PORT = this.configService.getOrThrow<string>('PORT')
    environment.NODE_ENV = this.configService.get<string>('NODE_ENV') ?? NODE_ENV.DEV
    environment.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET')
    environment.JWT_EXPIRES_IN_SECONDS = this.configService.getOrThrow<number>('JWT_EXPIRES_IN_SECONDS')
    environment.DB_USER = this.configService.getOrThrow<string>('DB_USER')
    environment.DB_PASS = this.configService.getOrThrow<string>('DB_PASS')
    environment.DB_HOST = this.configService.getOrThrow<string>('DB_HOST')
    environment.DB_PORT = this.configService.getOrThrow<string>('DB_PORT')
    environment.DB_NAME = this.configService.getOrThrow<string>('DB_NAME')
    environment.SUPER_ADMIN_EMAIL = this.configService.getOrThrow<string>('SUPER_ADMIN_EMAIL')
    environment.SUPER_ADMIN_PASSWORD = this.configService.getOrThrow<string>('SUPER_ADMIN_PASSWORD')
    // optional var - no need to fail
    environment.DB_SSL = this.configService.get<boolean>('DB_SSL')
    environment.LOCALE = this.configService.get<string>('LOCALE')

    return environment
  }
}
