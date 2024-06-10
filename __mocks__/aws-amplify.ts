import 'react-native';
import {jest} from '@jest/globals';
jest.mock('aws-amplify', () => {
  return {
    I18n: {
      get: jest.fn(() => ''),
      putVocabulariesForLanguage: jest.fn(() => {}),
      setLanguage: jest.fn(() => {}),
    },
  };
});
