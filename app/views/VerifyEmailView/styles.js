import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { themes } from '../../constants/colors'
const theme = 'light';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 120,
    maxHeight: 170,
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'HindVadodara-Bold',
    marginTop: hp(5),
    color: themes[theme].titleColor,
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: wp(5),
    marginTop: 4,
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 23,
  },
  subLinkText: {
    textAlign: 'center',
    marginHorizontal: 48,
    marginTop: 12,
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    lineHeight: 16,
  },
  subDescriptionText: {
    textAlign: 'center',
    marginHorizontal: wp(24),
    marginTop: 4,
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 23,
  },
  actionBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  actionText: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'white',
  },
})
