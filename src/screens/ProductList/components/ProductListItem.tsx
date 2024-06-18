import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomUtils} from '../../../utils/CustomConstans';
import {I18n} from 'aws-amplify';
import {FinancialProductType} from '../../../interface/ProductListScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';

export const ProductListItem = memo((props: FinancialProductType) => {
  return (
    <View style={style.container}>
      <View>
        <Text style={style.titleCard}>{props.name}</Text>
        <Text style={style.subTitleCard}>
          {I18n.get('ID')}: {props.id}
        </Text>
      </View>
      <FontAwesomeIcon icon={faArrowRight} />
    </View>
  );
});
const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleCard: {fontSize: CustomUtils.getPxW(4.5), fontWeight: '500'},
  subTitleCard: {},
});
