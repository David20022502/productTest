import React from 'react';
import {AppContextActionTypes} from '../context/App/AppTypes';
import {FinancialProductType} from './ProductListScreen';

export interface AppContextModel {
  isLoading: boolean;
  loadingHandler: (isLoading: boolean) => void;
  reloadProducts: boolean;
  handeReloadProductsTag: (reload: boolean) => void;
  errorShowHandler: (error?: string) => void;
}
export type AppContextActionType =
  | {
      type: AppContextActionTypes.RELOAD_PRODUCTS;
      payload: boolean;
    }
  | {
      type: AppContextActionTypes.LOADING_HANDLER;
      payload: boolean;
    };

export interface AppStateProps {
  children: React.ReactNode;
}
