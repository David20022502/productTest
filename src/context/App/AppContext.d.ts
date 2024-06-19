export interface AppContextModel {
  isLoading: boolean;
  loadingHandler: (isLoading: boolean) => void;
  reloadProducts: boolean;
  handeReloadProductsTag: (reload: boolean) => void;
  errorShowHandler: (error?: string) => void;
}
