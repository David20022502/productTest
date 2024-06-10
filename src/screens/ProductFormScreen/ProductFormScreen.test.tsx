import {test, jest, describe} from '@jest/globals';
import {
  render,
  RenderResult,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import ProductFormScreen from './ProductFormScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackNavigator} from '../../interface/AppNavigation';
beforeEach(() => {
  jest.useFakeTimers();
});
jest.mock('axios', () => {
  const mockedAxiosAction = jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          data: [
            {
              id: 'ACC_10',
              name: 'Acciones de coca-cola',
              description: 'Acciones del mercado',
              logo: 'https://.com',
              date_release: '2025-05-25',
              date_revision: '2025-05-25',
            },
          ],
          status: 200,
        });
      }),
  );
  const mockedAxiosActionGet = jest.fn();
  mockedAxiosActionGet.mockReturnValueOnce(
    new Promise(resolve => {
      resolve({data: false, status: 200});
    }),
  );
  mockedAxiosActionGet.mockReturnValueOnce(
    new Promise(resolve => {
      resolve({data: true, status: 200});
    }),
  );
  return {
    create: jest.fn(() => {
      return {
        put: mockedAxiosAction,
        get: mockedAxiosActionGet,
        post: mockedAxiosAction,
        delete: mockedAxiosAction,
      };
    }),
  };
});
describe('Llenar un campo del formulario y resetear el formulario', () => {
  let productFormScreenRender: RenderResult;
  beforeEach(() => {
    productFormScreenRender = render(<ProductFormScreen />);
  });
  test('', async () => {
    await userEvent.type(
      productFormScreenRender.getByTestId('product-id-text-input'),
      'ACC_5',
    );
    expect(
      productFormScreenRender.getByTestId('product-id-text-input').props.value,
    ).toBe('ACC_5');
    await userEvent.press(
      productFormScreenRender.getByTestId('reset-form-button'),
    );
    expect(
      productFormScreenRender.getByTestId('product-id-text-input').props.value,
    ).toBe('');
  });
});

describe('Agregar un producto', () => {
  const navigateMock = jest.fn();
  const navigationMock: Partial<
    StackNavigationProp<MainStackNavigator, 'ProductFormScreen'>
  > = {navigate: navigateMock};
  let productFormScreenRender: RenderResult;
  beforeEach(() => {
    productFormScreenRender = render(
      <ProductFormScreen
        navigation={
          navigationMock as StackNavigationProp<
            MainStackNavigator,
            'ProductFormScreen'
          >
        }
      />,
    );
  });
  test('', async () => {
    await userEvent.type(
      productFormScreenRender.getByTestId('product-id-text-input'),
      'ACC_5',
    );
    await userEvent.type(
      productFormScreenRender.getByTestId('product-name-text-input'),
      'Acciones tesla',
    );
    await userEvent.type(
      productFormScreenRender.getByTestId('product-description-text-input'),
      'Acciones de tesla al mercado',
    );
    await userEvent.type(
      productFormScreenRender.getByTestId('product-logo-text-input'),
      'https://logo.comimage.png',
    );
    await userEvent.type(
      productFormScreenRender.getByTestId('product-delivery-date-text-input'),
      '2025-05-23',
    );
    expect(
      productFormScreenRender.getByTestId('product-id-text-input').props.value,
    ).toBe('ACC_5');
    expect(
      productFormScreenRender.getByTestId('product-name-text-input').props
        .value,
    ).toBe('Acciones tesla');
    expect(
      productFormScreenRender.getByTestId('product-description-text-input')
        .props.value,
    ).toBe('Acciones de tesla al mercado');
    expect(
      productFormScreenRender.getByTestId('product-logo-text-input').props
        .value,
    ).toBe('https://logo.comimage.png');
    expect(
      productFormScreenRender.getByTestId('product-delivery-date-text-input')
        .props.value,
    ).toBe('2025-05-23');
    await waitFor(() => {
      expect(
        productFormScreenRender.getByTestId('product-revision-date-text-input')
          .props.value,
      ).toBe('2026-05-23');
    });
    await userEvent.press(
      productFormScreenRender.getByTestId('submit-form-button'),
    );
    expect(navigateMock.mock.calls[0][0]).toBe('ProductListScreen');
  });
});

describe('Editar un producto', () => {
  let productFormScreenRender: RenderResult;
  const navigateMocked = jest.fn();
  const navigation: Partial<
    StackNavigationProp<MainStackNavigator, 'ProductFormScreen'>
  > = {navigate: navigateMocked};
  beforeEach(async () => {
    productFormScreenRender = render(
      <ProductFormScreen
        navigation={
          navigation as StackNavigationProp<
            MainStackNavigator,
            'ProductFormScreen'
          >
        }
        route={{
          params: {
            financialProduct: {
              id: 'ACC_10',
              name: 'Acciones de coca-cola',
              description: 'Acciones del mercado',
              logo: 'https://.com',
              date_release: '2025-05-25',
              date_revision: '2025-05-25',
            },
          },
        }}
      />,
    );
  });
  test('', async () => {
    expect(
      productFormScreenRender.getByTestId('product-id-text-input').props.value,
    ).toBe('ACC_10');
    await userEvent.press(
      productFormScreenRender.getByTestId('submit-form-button'),
    );
    expect(navigateMocked.mock.calls[0][0]).toBe('ProductListScreen');
  });
});
