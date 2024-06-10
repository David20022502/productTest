import React, {useCallback, useContext, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../../constants/commonStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomUtils} from '../../utils/CustomConstans';
import {I18n} from 'aws-amplify';
import {ProductInfoRow} from './components/ProductInfoRow';
import {ScrollView} from 'react-native-gesture-handler';
import {
  MainStackNavigator,
  ProdutDetailProps,
} from '../../interface/AppNavigation';
import AppContext from '../../context/App/AppContext';
import useProducts from '../../hooks/useProducts';
import {ErrorCatch} from '../../interface/Interface';
import {
  CustomModal,
  FooterContent,
  HeaderApp,
  StyledButton,
} from '../../utils/CustomExports';
type ProductDetailScreenProps = {
  navigation?: StackNavigationProp<MainStackNavigator, 'ProductDetailScreen'>;
  route: {
    params: ProdutDetailProps;
  };
};
const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {financialProduct} = route?.params;
  const {handleDeleteProduct, isLoading, setIsLoading} = useProducts({
    loadInitialProducts: false,
  });
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const {errorShowHandler, handeReloadProductsTag} = useContext(AppContext);
  const onDeleteFinancialProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      await handleDeleteProduct(financialProduct.id);
      setModalDeleteVisible(false);
      handeReloadProductsTag(true);
      navigation?.navigate('ProductListScreen');
    } catch (e: ErrorCatch) {
      errorShowHandler(I18n.get(e?.message));
    } finally {
      setIsLoading(false);
    }
  }, [financialProduct]);
  return (
    <View style={commonStyles.screenContainer}>
      <HeaderApp />
      <ScrollView
        style={commonStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.scrollViewStyle}>
        <View style={style.containerHeaderInfo}>
          <Text testID="product-id-text" style={style.titleInfo}>
            {I18n.get('ID')}: {financialProduct?.id}
          </Text>
          <Text style={style.subTitleInfo}>{financialProduct?.name}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <ProductInfoRow
            rowTitle={I18n.get('NAME')}
            rowSubtitle={financialProduct?.name}
          />
          <ProductInfoRow
            rowTitle={I18n.get('DESCRIPTION')}
            rowSubtitle={financialProduct?.description}
          />
          <ProductInfoRow rowTitle={I18n.get('LOGO')} />
          <Image
            source={{uri: financialProduct?.logo}}
            resizeMode="contain"
            width={CustomUtils.getPxW(50)}
            height={CustomUtils.getPxW(50)}
          />
          <ProductInfoRow
            rowTitle={I18n.get('DELIVERY_DATE')}
            rowSubtitle={CustomUtils.formatDate(financialProduct?.date_release)}
          />
          <ProductInfoRow
            rowTitle={I18n.get('REVISION_DATE')}
            rowSubtitle={CustomUtils.formatDate(
              financialProduct?.date_revision,
            )}
          />
        </View>
      </ScrollView>
      <FooterContent>
        <StyledButton
          title={I18n.get('EDIT')}
          type="secondary"
          onPress={() => {
            navigation?.navigate('ProductFormScreen', {financialProduct});
          }}
        />
        <StyledButton
          title={I18n.get('DELETE')}
          testID="delete-financial-product"
          type="error"
          onPress={() => setModalDeleteVisible(true)}
        />
      </FooterContent>
      <CustomModal
        isLoading={isLoading}
        visible={modalDeleteVisible}
        confirmText={`${I18n.get(`CONFIRM_DELETE`)} ${financialProduct?.name}?`}
        onConfirm={onDeleteFinancialProduct}
        onClose={() => {
          setModalDeleteVisible(false);
        }}
      />
    </View>
  );
};
export default ProductDetailScreen;
const style = StyleSheet.create({
  titleInfo: {fontSize: CustomUtils.getPxW(5), fontWeight: 'bold'},
  subTitleInfo: {
    fontSize: CustomUtils.getPxW(4),
  },
  containerHeaderInfo: {
    marginBottom: CustomUtils.getPxH(5),
  },
});
