import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { PostLoginController } from '@app/modules/jwt-auth/controller/post-login.controller'
import { PostRefreshTokenController } from '@app/modules/jwt-auth/controller/post-refresh-token.controller'
import { PostLoginAction } from '@app/modules/jwt-auth/action/post-login.action'
import { PostRefreshTokenAction } from '@app/modules/jwt-auth/action/post-refresh-token.action'
import { JwtAuthService } from '@app/modules/jwt-auth/service/jwt-auth.service'
import { EnvironmentConfig } from '@app/@config/environment.config'
import { JwtAuthStrategy } from '@app/modules/jwt-auth/jwt-auth.strategy'
import { UserModule } from '@app/modules/user/user.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [EnvironmentConfig],
      useFactory: (environmentConfig: EnvironmentConfig) => ({
        secret: environmentConfig.config.JWT_SECRET,
        signOptions: {
          expiresIn: environmentConfig.config.JWT_EXPIRES_IN_SECONDS
        }
      })
    }),
    UserModule
  ],
  providers: [PostLoginAction, PostRefreshTokenAction, JwtAuthService, JwtAuthStrategy],
  exports: [],
  controllers: [PostLoginController, PostRefreshTokenController]
})
export class JwtAuthModule {}
