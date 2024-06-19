export type MainStackNavigator = {
  ProductListScreen: undefined;
  ProductDetailScreen: ProdutDetailProps;
  ProductFormScreen?: ProdutDetailProps;
};
export interface ProdutDetailProps {
  financialProduct: FinancialProductType;
}
