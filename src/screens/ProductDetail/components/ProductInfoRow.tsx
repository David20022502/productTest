import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomUtils} from '../../../utils/CustomConstans';

interface ProductInfoRowProps {
  rowTitle: string;
  rowSubtitle?: string;
}
export const ProductInfoRow = (props: ProductInfoRowProps) => {
  return (
    <View style={style.container}>
      <Text style={style.titleStyle}>{props.rowTitle}</Text>
      <Text style={style.subTitleStyle}>{props.rowSubtitle}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    marginHorizontal: 5,
  },
  titleStyle: {fontSize: CustomUtils.getPxW(4), flex: 1},
  subTitleStyle: {
    fontWeight: 'bold',
    fontSize: CustomUtils.getPxW(5),
    flex: 1,
  },
});
