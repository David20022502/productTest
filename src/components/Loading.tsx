import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
const loading = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={CustomUtils.colors.dark} />
    </View>
  );
};
export default loading;
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
