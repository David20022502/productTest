import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomUtils} from '../../../utils/CustomConstans';
import {FinancialProductType} from '../../../interface/ProductListScreen';
import {ProductListItem} from './ProductListItem';
import {Divider, NotResult} from '../../../utils/CustomExports';
interface FinancialDataRenderProps {
  data: FinancialProductType[];
  onSelectProduct?: (financialProduct: FinancialProductType) => void;
}
const ProductList = ({data, onSelectProduct}: FinancialDataRenderProps) => {
  return (
    <>
      {data?.length > 0 ? (
        <View style={style.container}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={item => (
              <TouchableOpacity
                accessible={true}
                accessibilityRole="button"
                accessibilityHint="Al precionar en este item accederás a la pantalla de más información del producto"
                testID="select-product-list"
                onPress={() => {
                  if (onSelectProduct) onSelectProduct(item.item);
                }}>
                <ProductListItem {...item.item} />
                {!(item.index >= (data?.length || 0)) && (
                  <Divider style={style.dividerStyle} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <NotResult />
      )}
    </>
  );
};
export default ProductList;
const style = StyleSheet.create({
  container: {
    borderColor: CustomUtils.colors.gray,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  dividerStyle: {
    marginHorizontal: 8,
  },
});
