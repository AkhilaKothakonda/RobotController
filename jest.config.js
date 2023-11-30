/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  roots: [
    '<rootDir>/test',
  ],
};
