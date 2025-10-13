import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx'
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "html"
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types',
    '^@services/(.*)$': '<rootDir>/src/services/$1'
  },
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  testMatch: [
    '<rootDir>/src/**/*.test.(ts|tsx|js)',
    '<rootDir>/src/**/*.spec.(ts|tsx|js)',
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
};

export default config;
