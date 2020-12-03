const path = require('path');

module.exports = {
  transform: {
    "^.+\\.[j|t]sx?$": "ts-jest"
  },
  testMatch: [
    '<rootDir>/src/schema/**/__tests__/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/graphql/*/__tests__/*-test.js?(x)'
  ],
  rootDir: path.resolve(__dirname, './'),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  automock: false,
  setupFiles: ['./conf/setupJest.ts'],
  setupFilesAfterEnv: ['jest-graphql']
};
