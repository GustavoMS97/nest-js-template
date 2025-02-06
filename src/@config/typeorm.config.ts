import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { forwardRef } from '@nestjs/common'

import { AppConfigModule } from '@app/app-config.module'
import { EnvironmentConfig } from '@app/@config/environment.config'

export const typeOrmConfig = {
  imports: [forwardRef(() => AppConfigModule)],
  inject: [EnvironmentConfig],
  useFactory: (environmentConfig: EnvironmentConfig): TypeOrmModuleOptions => ({
    type: 'mysql',
    autoLoadEntities: true,
    entities: ['@app/modules/**/*.entity{.ts,.js}'],
    migrations: ['@app/@migrations/*.{.ts,.js}'],
    synchronize: false,
    host: environmentConfig.config.DB_HOST,
    port: parseInt(environmentConfig.config.DB_PORT),
    username: environmentConfig.config.DB_USER,
    password: environmentConfig.config.DB_PASS,
    database: environmentConfig.config.DB_NAME,
    ssl: environmentConfig.config.DB_SSL ? { rejectUnauthorized: false } : false
  })
}
