import '../../../__mocks__/axios';
import {test, describe} from '@jest/globals';
import {RenderResult, render, userEvent} from '@testing-library/react-native';
import ProductDetailScreen from './ProductDetailScreen';
import {MainStackNavigator} from '../../interface/AppNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
jest.useFakeTimers();
describe('Mostrar los detalles del producto', () => {
  let productDetailScreenRender: RenderResult;
  beforeEach(() => {
    productDetailScreenRender = render(
      <ProductDetailScreen
        route={{
          params: {
            financialProduct: {
              id: 'ACC_10',
              name: 'Acciones de coca-cola',
              description: 'Acciones del mercado',
              logo: 'https://.com',
              date_release: '2025-05-24',
              date_revision: '2025-05-25',
            },
          },
        }}
      />,
    );
  });
  test('', async () => {
    expect(productDetailScreenRender.getByText(': ACC_10')).toBeTruthy();
    expect(productDetailScreenRender.getByText('2025-05-25')).toBeTruthy();
  });
});
describe('Borrar el producto indicado', () => {
  let productDetailScreenRender: RenderResult;
  const novagateMock = jest.fn();
  const navigation: Partial<
    StackNavigationProp<MainStackNavigator, 'ProductDetailScreen'>
  > = {navigate: novagateMock};
  beforeEach(() => {
    productDetailScreenRender = render(
      <ProductDetailScreen
        navigation={
          navigation as StackNavigationProp<
            MainStackNavigator,
            'ProductDetailScreen'
          >
        }
        route={{
          params: {
            financialProduct: {
              id: 'ACC_10',
              name: 'Acciones de coca-cola',
              description: 'Acciones del mercado',
              logo: 'https://.com',
              date_release: '2025-05-24',
              date_revision: '2025-05-25',
            },
          },
        }}
      />,
    );
  });
  test('', async () => {
    await userEvent.press(
      productDetailScreenRender.getByTestId('delete-financial-product'),
    );
    await userEvent.press(
      productDetailScreenRender.getByTestId('delete-confirm-financial-product'),
    );
    expect(novagateMock.mock.calls[0][0]).toBe('ProductListScreen');
  });
});
