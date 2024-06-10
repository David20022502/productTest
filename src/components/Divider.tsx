import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
interface DividerProps {
  style?: StyleProp<ViewStyle>;
}
const divider = (props: DividerProps) => {
  return <View style={[style.container, props.style]} />;
};
export default divider;
const style = StyleSheet.create({
  container: {
    width: 'auto',
    height: 1,
    backgroundColor: '#e3e3e3',
  },
});
