import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLOR_YELLOW, themes } from '../../constants/colors'
const theme = 'light';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes[theme].backgroundColor,
    flexDirection: 'column',
  },
  logo: {
    height: 82,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(11),
  },
  description: {
    alignItems: 'center',
    marginBottom: hp(3.9),
    paddingHorizontal: wp(7),
  },
  loginTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'HindVadodara-Bold',
    color: themes[theme].titleColor,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    color: themes[theme].textColor,
  },
  dontText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    color: themes[theme].textColor,
  },
  loginText: {
    color: COLOR_YELLOW,
    fontFamily: 'Raleway',
    fontSize: 14,
    marginLeft: -3,
  },
})
