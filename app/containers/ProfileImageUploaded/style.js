import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 89,
    paddingLeft: 17,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  imageNameContainer: {
    marginLeft: 13,
    flex: 1,
  },
  imageName: {
    fontWeight: '500',
    fontFamily: 'Hind Vadodara',
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
    color: themes.light.titleColor,
  },
  uploadNewImageText: {
    fontFamily: 'Raleway',
    fontSize: 12,
    marginLeft: 6,
    lineHeight: 22,
    fontWeight: '600',
    color: themes.light.textColor,
  },
  uploadIconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
