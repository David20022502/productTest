import {AppContextModel} from '../../interface/AppContext';

export enum AppContextActionTypes {
  LOADING_HANDLER = 'LOADING_HANDLER',
  RELOAD_PRODUCTS = 'RELOAD_PRODUCTS',
}

export const appContextProps: AppContextModel = {
  isLoading: false,
  reloadProducts: false,
  handeReloadProductsTag: () => {},
  loadingHandler: () => {},
  errorShowHandler: () => {},
};
