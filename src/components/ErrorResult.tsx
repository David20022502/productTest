import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../constants/commonStyles';
import {CustomUtils} from '../utils/CustomConstans';
import {I18n} from 'aws-amplify';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRedo} from '@fortawesome/free-solid-svg-icons/faRedo';

interface ErrorResultProps {
  message?: string;
  onReload?: () => void;
}
const errorResult = ({message, onReload}: ErrorResultProps) => {
  return (
    <TouchableOpacity style={commonStyles.errorContainer} onPress={onReload}>
      <Text style={style.messageStyle}>
        {I18n.get(message || 'AN_ERROR_OCCURRED')}
      </Text>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faRedo} size={CustomUtils.getPxW(7)} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default errorResult;
const style = StyleSheet.create({
  messageStyle: {
    fontSize: CustomUtils.getPxW(6),
    textAlign: 'center',
    marginVertical: 10,
  },
});
