import {I18n} from 'aws-amplify';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
const notResult = () => {
  return (
    <View style={style.container}>
      <Text style={style.messageStyle}>{I18n.get('NOT_DATA')}</Text>
    </View>
  );
};
export default notResult;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageStyle: {
    fontSize: CustomUtils.getPxW(6),
  },
});
