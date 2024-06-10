import '../../../__mocks__/axios';
import {test} from '@jest/globals';
import {
  RenderResult,
  render,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
jest.useFakeTimers();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});
describe('Buscar un producto', () => {
  let productListRender: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      productListRender = render(
        <NavigationContainer>
          <ProductListScreen />
        </NavigationContainer>,
      );
    });
  });
  test('', async () => {
    await userEvent.type(
      productListRender.getByTestId('search-text-input'),
      'intel',
    );
    await waitFor(() => {
      expect(productListRender.getByText('Acciones de intel')).toBeTruthy();
    });
    expect(productListRender.queryByText('Acciones de coca-cola')).toBeFalsy();
  });
});

describe('Limpiar buscador', () => {
  let productListRender: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      productListRender = render(
        <NavigationContainer>
          <ProductListScreen />
        </NavigationContainer>,
      );
    });
  });
  test('', async () => {
    await userEvent.type(
      productListRender.getByTestId('search-text-input'),
      'intel',
    );
    await waitFor(() => {
      expect(productListRender.getByText('Acciones de intel')).toBeTruthy();
    });
    expect(productListRender.queryByText('Acciones de coca-cola')).toBeFalsy();
    await userEvent.clear(productListRender.getByTestId('search-text-input'));
    expect(productListRender.getByText('Acciones de intel')).toBeTruthy();
    expect(productListRender.queryByText('Acciones de coca-cola')).toBeTruthy();
  });
});
describe('Seleccionar un producto', () => {
  const navigateMock = jest.fn();
  (useNavigation as jest.Mock).mockReturnValue({navigate: navigateMock});
  let productListRender: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      productListRender = render(
        <NavigationContainer>
          <ProductListScreen />
        </NavigationContainer>,
      );
    });
  });
  test('', async () => {
    expect(
      productListRender.queryAllByTestId('select-product-list').length,
    ).toBe(0);
    await waitFor(() => {
      expect(
        productListRender.queryAllByTestId('select-product-list').length,
      ).toBeGreaterThan(1);
    });
    await userEvent.press(
      productListRender.queryAllByTestId('select-product-list')[0],
    );
    expect(navigateMock.mock.calls[0][0]).toBe('ProductDetailScreen');
    expect(navigateMock.mock.calls[0][1]).toEqual({
      financialProduct: {
        id: 'ACC_10',
        name: 'Acciones de intel',
        description: 'Acciones del intel',
        logo: 'https://.com',
        date_release: '2025-05-25',
        date_revision: '2026-05-25',
      },
    });
  });
});
