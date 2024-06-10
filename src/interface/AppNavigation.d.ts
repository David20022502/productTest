import {FinancialProductType} from './ProductListScreen';

export type MainStackNavigator = {
  ProductListScreen: undefined;
  ProductDetailScreen: ProdutDetailProps;
  ProductFormScreen?: ProdutDetailProps;
};

export type ProdutDetailProps = {
  financialProduct: FinancialProductType;
};
