import React from 'react';
import {View} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
interface SpacerProps {
  x?: number;
  y?: number;
}
const spacer = (props: SpacerProps) => {
  return (
    <View
      style={{
        height: CustomUtils.getPxH(props.y || 1),
        width: CustomUtils.getPxW(props.x || 1),
      }}
    />
  );
};
export default spacer;
