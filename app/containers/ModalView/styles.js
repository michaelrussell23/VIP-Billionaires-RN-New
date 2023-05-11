import {StyleSheet} from 'react-native';
import { themes } from '../../constants/colors';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'red',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontWeight: '600',
    fontFamily: 'Hind Vadodara',
    fontSize: 20,
    lineHeight: 28,
    marginVertical: 8,
    textAlign: 'center',
    color: themes.light.titleColor,
  },
});

export default styles;
