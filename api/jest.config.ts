import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  roots: ['./src'],
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.ts'],
  displayName: 'Lots O Slots API',
  name: 'slots-api',
  modulePathIgnorePatterns: ['/dist/'],
  preset: 'ts-jest',
};
