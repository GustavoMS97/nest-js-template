import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import { EnvironmentVariablesDto } from '@app/modules/@shared/dto/environment-variables.dto'

export function validate(config: Record<string, unknown>): EnvironmentVariablesDto {
  const validatedConfig = plainToInstance(EnvironmentVariablesDto, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
