import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
import Divider from './Divider';
import {I18n} from 'aws-amplify';
import {faBank} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const headerApp = () => {
  return (
    <View accessible={true} accessibilityRole="header">
      <View style={style.container}>
        <FontAwesomeIcon
          icon={faBank}
          style={style.iconStyle}
          size={CustomUtils.getPxW(5)}
          color={CustomUtils.colors.gray}
        />
        <Text style={style.headetTittleStyle}>{I18n.get('BANK')}</Text>
      </View>
      <Divider />
    </View>
  );
};
export default headerApp;
const style = StyleSheet.create({
  container: {
    width: '100%',
    height: CustomUtils.dimensions.height * 0.09,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headetTittleStyle: {
    color: CustomUtils.colors.gray,
    fontWeight: 'bold',
    fontSize: CustomUtils.getPxW(5.5),
  },
  iconStyle: {marginHorizontal: 10},
});
