import React, {useCallback, useMemo, useReducer} from 'react';
import AppContext from './AppContext';
import {AppReducer} from './AppReducer';
import {AppContextActionTypes, appContextProps} from './AppTypes';
import {Alert} from 'react-native';
import {I18n} from 'aws-amplify';
import {AppContextModel} from './appcontext.d';
interface AppStateProps {
  children: React.ReactNode;
}
export const AppState = ({children}: AppStateProps) => {
  const initialValues = useMemo<AppContextModel>(() => appContextProps, []);
  const [state, dispatch] = useReducer(AppReducer, initialValues);
  const errorShowHandler = useCallback((error?: string) => {
    Alert.alert('Error', error || I18n.get('AN_ERROR_OCCURRED'), [
      {text: 'OK', onPress: () => {}},
    ]);
  }, []);
  const loadingHandler = useCallback((isLoading: boolean) => {
    dispatch({type: AppContextActionTypes.LOADING_HANDLER, payload: isLoading});
  }, []);
  const handeReloadProductsTag = (reload: boolean) => {
    dispatch({type: AppContextActionTypes.RELOAD_PRODUCTS, payload: reload});
  };
  return (
    <AppContext.Provider
      value={{
        reloadProducts: state.reloadProducts,
        isLoading: state.isLoading,
        handeReloadProductsTag,
        loadingHandler,
        errorShowHandler,
      }}>
      {children}
    </AppContext.Provider>
  );
};
