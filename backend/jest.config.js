module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@auth/prisma-adapter|next-auth)/'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      useESM: true,
    },
  },
};
