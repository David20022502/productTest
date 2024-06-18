import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
interface StyledButtonProps {
  type?: 'primary' | 'secondary' | 'error';
  title: string;
  isLoading?: boolean;
}
const styledButton = (props: StyledButtonProps & TouchableOpacityProps) => {
  let internalButtonStyle: {
    buttonContainer?: StyleProp<ViewStyle>;
    buttonTitleStyle?: StyleProp<TextStyle>;
    loadingColor?: string;
  } = {
    buttonContainer: {
      backgroundColor: CustomUtils.colors[props.type || 'primary'],
    },
    buttonTitleStyle: {
      color: props.type == 'error' ? 'white' : 'black',
    },
    loadingColor: props.type == 'error' ? 'white' : 'black',
  };
  return (
    <TouchableOpacity
      {...props}
      accessible={true}
      accessibilityRole="button"
      onPress={props.onPress}
      style={[
        style.buttonContainer,
        internalButtonStyle.buttonContainer,
        props.disabled
          ? {backgroundColor: CustomUtils.colors.disabled}
          : internalButtonStyle.buttonContainer,
      ]}>
      <Text
        style={[style.buttonTitleStyle, internalButtonStyle.buttonTitleStyle]}>
        {props.title}
      </Text>
      {props.isLoading && (
        <ActivityIndicator
          style={{margin: 5}}
          color={internalButtonStyle.loadingColor}
        />
      )}
    </TouchableOpacity>
  );
};
export default styledButton;
const style = StyleSheet.create({
  buttonContainer: {
    width: 'auto',
    height: 50,
    backgroundColor: CustomUtils.colors.primary,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonTitleStyle: {
    fontWeight: 'bold',
    fontSize: CustomUtils.getPxW(4.5),
  },
});
