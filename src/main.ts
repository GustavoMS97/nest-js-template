import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as pack from '@root/package.json'

import { AppModule } from '@app/app.module'
import { EnvironmentConfig } from '@app/@config/environment.config'
import { NODE_ENV } from '@app/modules/@shared/dto/environment-variables.dto'

async function bootstrap(): Promise<void> {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')

  const environmentConfig = app.get(EnvironmentConfig)
  if ((environmentConfig.config.NODE_ENV as NODE_ENV) !== NODE_ENV.PRD) {
    const config = new DocumentBuilder()
      .setTitle('NestJS Template API Docs')
      .setDescription(`Example of docs for a template`)
      .setVersion(pack.version)
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
      .addBasicAuth({ type: 'http', scheme: 'basic' }, 'basic')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
  }

  const port = environmentConfig.config.PORT
  await app.listen(port)

  logger.log(`Listening at http://localhost:${port}`)
}
void bootstrap()
