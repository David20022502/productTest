import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface FooterContentProps {
  children: React.ReactNode;
}
const footerContent = (props: FooterContentProps) => {
  return <View style={style.container}>{props.children}</View>;
};
export default footerContent;
const style = StyleSheet.create({
  container: {width: 'auto', paddingBottom: 20, marginHorizontal: 20},
});
