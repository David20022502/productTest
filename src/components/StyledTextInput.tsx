import React from 'react';
import {StyleSheet, TextInput, View, TextInputProps, Text} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
import {I18n} from 'aws-amplify';
interface StyledTextInput {
  error?: string | null;
  label?: string;
}
const styledTextInput = (props: StyledTextInput & TextInputProps) => {
  return (
    <View style={style.containerStyle}>
      <Text style={style.labelStyle}>{props.label}</Text>
      <TextInput
        {...props}
        accessible={true}
        maxLength={props.maxLength || 75}
        style={[
          style.containerInputStyle,
          {
            borderColor: props.error
              ? CustomUtils.colors.error
              : props.editable || props.editable == undefined
              ? CustomUtils.colors.gray
              : CustomUtils.colors.disabledBackGround,
            backgroundColor:
              props.editable || props.editable == undefined
                ? 'transparent'
                : CustomUtils.colors.disabledBackGround,
          },
        ]}
      />
      {props.error && (
        <Text style={style.errorStyle}>{I18n.get(props.error)}</Text>
      )}
    </View>
  );
};
export default styledTextInput;
const style = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  containerInputStyle: {
    borderWidth: 1,
    borderRadius: 5,
  },
  errorStyle: {
    color: CustomUtils.colors.error,
    fontSize: CustomUtils.getPxW(3),
  },
  labelStyle: {
    color: CustomUtils.colors.dark,
    fontSize: CustomUtils.getPxW(4),
    marginBottom: 5,
  },
});
