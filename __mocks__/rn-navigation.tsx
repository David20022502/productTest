import 'react-native-gesture-handler/jestSetup';
import {jest} from '@jest/globals';
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn(() => {
      return {
        Navigator: jest.fn().mockReturnValue(null),
        Screen: jest.fn().mockReturnValue(null),
      };
    }),
  };
});
