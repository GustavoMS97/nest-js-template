import BaseConfig from './jest.config'

const E2eConfig = {
  ...BaseConfig,
  collectCoverageFrom: ['src/**/*.controller.ts'],
  testRegex: '.e2e.ts$'
}
export default E2eConfig
