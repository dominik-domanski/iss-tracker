import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
  moduleNameMapper: {
    '\\.(css|scss|png)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
