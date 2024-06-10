/**
 * @format
 */
import '../__mocks__/axios';
import 'react-native';
import React from 'react';
import App from '../App';
import {test} from '@jest/globals';
import {render} from '@testing-library/react-native';
test('Renderizar App.tsx', () => {
  render(<App />);
});
