module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.(png|jpg|jpeg|gif|webp|svg)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testEnvironment: 'node',
};