import {
  AppContextActionType,
  AppContextModel,
} from '../../interface/AppContext';
import {AppContextActionTypes} from './AppTypes';

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
