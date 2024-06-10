import 'react-native';
import {jest} from '@jest/globals';
jest.mock('@fortawesome/react-native-fontawesome', () => {
  return {
    FontAwesomeIcon: jest.fn(() => <></>),
  };
});
