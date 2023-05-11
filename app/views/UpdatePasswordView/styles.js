import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themes } from '../../constants/colors'
const theme = 'light';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes[theme].backgroundColor,
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
    paddingVertical: 2,
    alignSelf: 'center',
  },
  forgotContainer: {
    marginBottom: 10,
  },
  forgotText: {
    textAlign: 'right',
    textDecorationLine: 'none',
    color: '#C4C4C4',
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  description: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: wp(8),
  },
  loginTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'HindVadodara-Bold',
    marginBottom: hp(5),
    color: themes[theme].titleColor,
  },
  loginText: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
    color: themes[theme].textColor,
  },
  descriptionText: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: themes[theme].textColor,
  },
})
