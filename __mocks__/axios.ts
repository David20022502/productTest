import {jest} from '@jest/globals';
jest.mock('axios', () => {
  const mockedAxiosAction = jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          data: [
            {
              id: 'ACC_10',
              name: 'Acciones de intel',
              description: 'Acciones del intel',
              logo: 'https://.com',
              date_release: '2025-05-25',
              date_revision: '2026-05-25',
            },
            {
              id: 'ACC_12',
              name: 'Acciones de coca-cola',
              description: 'Acciones del mercado',
              logo: 'https://.com',
              date_release: '2025-05-25',
              date_revision: '2026-05-25',
            },
          ],
          status: 200,
        });
      }),
  );
  return {
    create: jest.fn(() => {
      return {
        get: mockedAxiosAction,
        post: mockedAxiosAction,
        delete: mockedAxiosAction,
        put: mockedAxiosAction,
      };
    }),
  };
});
