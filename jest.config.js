module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  roots: ['<rootDir>/__tests__'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupEnzyme.js'],
  testMatch: ['**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};