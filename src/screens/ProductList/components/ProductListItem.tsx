import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomUtils} from '../../../utils/CustomConstans';
import {I18n} from 'aws-amplify';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {Divider} from '../../../utils/CustomExports';
import {FinancialProductType} from '../../../interface/Product';
export interface ProductListItemProps {
  product: FinancialProductType;
  onPress: () => void;
  hiddenDivider?: boolean;
}
export const ProductListItem = memo(
  ({product, onPress, hiddenDivider}: ProductListItemProps) => {
    return (
      <TouchableOpacity
        {...{onPress}}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Al precionar en este item accederás a la pantalla de más información del producto"
        testID="select-product-list">
        <View style={style.container}>
          <View>
            <Text style={style.titleCard}>{product.name}</Text>
            <Text>
              {I18n.get('ID')}: {product.id}
            </Text>
          </View>
          <FontAwesomeIcon icon={faArrowRight} />
        </View>
        {!hiddenDivider && <Divider style={style.dividerStyle} />}
      </TouchableOpacity>
    );
  },
);
const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleCard: {fontSize: CustomUtils.getPxW(4.5), fontWeight: '500'},
  dividerStyle: {
    marginHorizontal: 8,
  },
});
