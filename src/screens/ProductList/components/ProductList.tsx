import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomUtils} from '../../../utils/CustomConstans';
import {ProductListItem} from './ProductListItem';
import {NotResult} from '../../../utils/CustomExports';
import {FinancialProductType} from '../../../interface/Product';
interface FinancialDataRenderProps {
  data: FinancialProductType[];
  onSelectProduct: (financialProduct: FinancialProductType) => void;
}
const ProductList = ({data, onSelectProduct}: FinancialDataRenderProps) => {
  return (
    <View style={{flex: 1}}>
      {data?.length > 0 ? (
        <View style={style.container}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <ProductListItem
                product={item}
                onPress={() => onSelectProduct(item)}
                hiddenDivider={index >= data.length - 1}
              />
            )}
          />
        </View>
      ) : (
        <NotResult />
      )}
    </View>
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
