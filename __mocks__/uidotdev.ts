import 'react-native';
import {jest} from '@jest/globals';
jest.mock('@uidotdev/usehooks', () => {
  return {
    useDebounce: jest.fn((value, delay) => {
      return value;
    }),
  };
});
