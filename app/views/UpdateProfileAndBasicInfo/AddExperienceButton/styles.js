import {StyleSheet} from 'react-native';
import { COLOR_YELLOW, themes } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_YELLOW,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 9,
    borderRadius: 30,
    height: 52,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Hind Vadodara',
    color: themes.light.titleColor,
  },
});
