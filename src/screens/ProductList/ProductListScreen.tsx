import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {commonStyles} from '../../constants/commonStyles';
import {I18n} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackNavigator} from '../../navigation/AppNavigation.d';
import useProducts from '../../hooks/products/useProducts';
import AppContext from '../../context/App/AppContext';
import {
  FooterContent,
  HeaderApp,
  SearchInput,
  Skeleton,
  Spacer,
  StyledButton,
} from '../../utils/CustomExports';
import ProductList from './components/ProductList';
import {FinancialProductType} from '../../interface/Product';
const ProductListScreen = () => {
  const {
    isLoading,
    products,
    handleCancelSearch,
    handleSearchProduct,
    error,
    handleReloadProducts,
  } = useProducts();
  const {handeReloadProductsTag, reloadProducts} = useContext(AppContext);
  const navigation =
    useNavigation<
      StackNavigationProp<MainStackNavigator, 'ProductListScreen'>
    >();
  useEffect(() => {
    if (reloadProducts) {
      handleReloadProducts();
      handeReloadProductsTag(false);
    }
  }, [reloadProducts]);
  const onSelectProduct = useCallback(
    (financialProduct: FinancialProductType) => {
      navigation.navigate('ProductDetailScreen', {financialProduct});
    },
    [],
  );
  return (
    <SafeAreaView
      testID="product-list-screen"
      style={commonStyles.screenContainer}>
      <HeaderApp />
      <View style={commonStyles.contentContainer}>
        <SearchInput
          testID="search-text-input"
          accessibilityHint="Al escribir en está caja de texto, se procederá a buscar el producto en el sistema"
          onSearch={value => {
            if (value) handleSearchProduct(value);
          }}
          onCancel={() => {
            handleCancelSearch();
          }}
        />
        <Spacer y={7} />
        <Skeleton {...{isLoading, error, onReload: handleReloadProducts}}>
          <ProductList data={products} onSelectProduct={onSelectProduct} />
        </Skeleton>
      </View>
      <FooterContent>
        <StyledButton
          accessibilityLabel="Botón agregar producto"
          accessibilityHint="Botón para agregar un nuevo producto en el servicio existente"
          testID="navigate-add-product"
          title={I18n.get('ADD')}
          onPress={() => navigation.navigate('ProductFormScreen')}
        />
      </FooterContent>
    </SafeAreaView>
  );
};

export default ProductListScreen;
