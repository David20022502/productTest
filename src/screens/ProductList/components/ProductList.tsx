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
        <View testID="1111" style={style.container}>
          <FlatList
            data={data}
            renderItem={item => (
              <TouchableOpacity
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
