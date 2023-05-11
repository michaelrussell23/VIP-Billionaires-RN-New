import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLOR_YELLOW, themes } from '../../constants/colors';
const theme = 'light';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewContainer: {
    flex: 1,
    height: '100%',
  },
  logo: {
    height: 82,
    resizeMode: 'contain',
  },
  headerContainer: {
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
    height: 149,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: wp(6),
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  forgotContainer: {
    marginBottom: 10,
  },
  forgotText: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 17,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(5.25),
  },
  description: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'HindVadodara-Bold',
    color: themes[theme].titleColor,
  },
  loginText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
    color: themes[theme].textColor,
  },
  dontText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    color: '#585858',
  },
  signupText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    color: COLOR_YELLOW,
    marginLeft: -3,
  },
})
