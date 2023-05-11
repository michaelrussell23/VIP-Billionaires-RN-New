import { StyleSheet } from 'react-native';
import { themes } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.light.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 9,
    borderRadius: 6,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    fontFamily: 'Raleway',
    color: themes.light.titleColor,
  },
  upload_text: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 22,
    fontFamily: 'Raleway',
    color: themes.light.borderColor,
  },
});
