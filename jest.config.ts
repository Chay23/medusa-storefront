import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	// preset: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	modulePathIgnorePatterns: ['__lib__'],
};

export default createJestConfig(config);
