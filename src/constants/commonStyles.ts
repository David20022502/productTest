import {StyleSheet} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 25,
    flex: 1,
    paddingTop: CustomUtils.getPxH(4),
  },
  scrollViewStyle: {
    paddingBottom: CustomUtils.getPxH(20),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
