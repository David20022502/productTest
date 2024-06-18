import React from 'react';
import {
  StyleSheet,
  View,
  Modal as ModalRN,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
import Divider from './Divider';
import StyledButton from './StyledButton';
import {I18n} from 'aws-amplify';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
interface ModalProps {
  isLoading?: boolean;
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText: string;
}
const modal = ({
  visible,
  onClose,
  confirmText,
  isLoading,
  onConfirm,
}: ModalProps) => {
  return (
    <ModalRN
      style={{backgroundColor: 'red'}}
      visible={visible}
      transparent={true}
      onDismiss={onClose}>
      <View style={style.container}>
        <View style={style.mainContainer}>
          <View style={style.headerContent}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Botón para cancelar y cerrar el modal de confirmación"
              testID="close-delete-confirm-modal"
              onPress={() => onClose()}>
              <FontAwesomeIcon icon={faClose} size={25} />
            </TouchableOpacity>
          </View>
          <View style={style.confirmContentStyle}>
            <Divider />
            <Text style={style.confirmTextStyle}>{confirmText}</Text>
            <Divider />
          </View>
          <View style={style.buttonContentStyle}>
            <StyledButton
              accessibilityHint="Botón para confirmar la acción por hacerse"
              testID="delete-confirm-financial-product"
              title={I18n.get('CONFIRM')}
              onPress={onConfirm}
              isLoading={isLoading}
              disabled={isLoading}
            />
            <StyledButton
              accessibilityHint="Botón para cancelar la acción por hacerse"
              title={I18n.get('CANCEL')}
              type="secondary"
              onPress={onClose}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </ModalRN>
  );
};
export default modal;
const style = StyleSheet.create({
  container: {
    backgroundColor: CustomUtils.colors.transparent,
    flex: 1,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: 30,
  },
  mainContainer: {
    paddingTop: 20,
    position: 'absolute',
    backgroundColor: CustomUtils.colors.white,
    width: '100%',
    height: CustomUtils.getPxH(42),
    bottom: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  confirmTextStyle: {
    marginVertical: CustomUtils.getPxH(3),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: CustomUtils.getPxW(5),
  },
  confirmContentStyle: {
    marginVertical: CustomUtils.getPxH(2),
  },
  buttonContentStyle: {
    marginHorizontal: 15,
  },
});
