module.exports = {
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'mjs',
    'cjs',
    'jsx',
    'json',
    'node'
  ],
  testMatch: [
    '**/__tests__/*.test.ts?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/temp/',
  ],

  transform: {
    '^.+(js)$': 'babel-jest',
  },
};
