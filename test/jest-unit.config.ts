import BaseConfig from './jest.config'

const UnitConfig = {
  ...BaseConfig,
  coveragePathIgnorePatterns: [...BaseConfig.coveragePathIgnorePatterns, '.controller.ts'],
  globalSetup: undefined,
  globalTeardown: undefined,
  testRegex: '.spec.ts$'
}
export default UnitConfig
