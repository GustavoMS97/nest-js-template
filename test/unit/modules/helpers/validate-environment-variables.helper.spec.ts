import { EnvironmentVariablesDto, NODE_ENV } from '@app/modules/@shared/dto/environment-variables.dto'
import { validate } from '@app/modules/helpers/validate-environment-variables.helper'

describe('validateEnvironmentVariables', () => {
  const config: EnvironmentVariablesDto = {
    NODE_ENV: NODE_ENV.TEST,
    PORT: '3000',
    DB_USER: 'test',
    DB_PASS: 'test',
    DB_HOST: 'test',
    DB_PORT: '2020',
    DB_NAME: 'test',
    JWT_EXPIRES_IN_SECONDS: 10,
    SUPER_ADMIN_EMAIL: 'email@mail.com',
    SUPER_ADMIN_PASSWORD: 'super_secure_password',
    JWT_SECRET: 'secret'
  }
  const environmentVariablesDto = Object.assign(new EnvironmentVariablesDto(), config)

  it('should return an EnvironmentVariablesDto when the configuration is as expected', () => {
    expect(validate(config as unknown as Record<string, unknown>)).toEqual(environmentVariablesDto)
  })

  it('should throw an error with an invalid configuration', () => {
    try {
      const copy = Object.assign({}, config) as unknown as Record<string, unknown>
      delete copy.PORT
      validate(copy)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message.replace(/\n/, ' ').trim()).toEqual(
        'An instance of EnvironmentVariablesDto has failed the validation:  - property PORT has failed the following constraints: isString'
      )
    }
  })
})
