import {AppContextActionTypes} from './AppTypes';
import {AppContextModel} from './appcontext.d';

export const AppReducer = (
  prevState: AppContextModel,
  action: AppContextActionType,
) => {
  const {payload, type} = action;
  switch (type) {
    case AppContextActionTypes.RELOAD_PRODUCTS: {
      return {...prevState, reloadProducts: payload};
    }
    default: {
      return prevState;
    }
  }
};
type AppContextActionType =
  | {
      type: AppContextActionTypes.RELOAD_PRODUCTS;
      payload: boolean;
    }
  | {
      type: AppContextActionTypes.LOADING_HANDLER;
      payload: boolean;
    };
