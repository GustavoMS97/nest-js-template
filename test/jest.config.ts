const BaseConfig = {
  clearMocks: true,
  collectCoverage: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'test/coverage/',
  coveragePathIgnorePatterns: [
    '/dist/',
    '.module.ts',
    '.interface.ts',
    '.error.ts',
    '.enum.ts',
    '.dto.ts',
    '.abstract.ts',
    '.entity.ts',
    '/node_modules/',
    'main.ts',
    '@migrations',
    '@config',
    'logger',
    'guards',
    'firebase-admin.service.ts',
    'video.helper.ts',
    '.data.ts'
  ],
  coverageThreshold: {
    global: {
      // TODO: Fix this as soon as possible - should be 100
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json'
      }
    ]
  },
  setupFiles: ['reflect-metadata'],
  globalSetup: '<rootDir>/test/e2e/setup.ts',
  globalTeardown: '<rootDir>/test/e2e/teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@root/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  rootDir: '../',
  roots: ['<rootDir>/src/', '<rootDir>/test/', '<rootDir>/'],
  testEnvironment: 'node',
  testRegex: '.(spec|e2e).ts$',
  verbose: true,
  workerIdleMemoryLimit: '7168MB',
  testPathIgnorePatterns: ['<rootDir>/dist/']
}

export default BaseConfig
