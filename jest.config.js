module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  setupFiles: [
    './__mocks__/fortawesome.tsx',
    './__mocks__/aws-amplify.ts',
    './__mocks__/rn-navigation.tsx',
    './__mocks__/uidotdev.ts',
  ],
};
