import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLOR_WHITE } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#000000CC',
  },
  mainContainer: {
    flexGrow: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 120,
  },
  logo: {
    marginTop: hp(33),
    width: '80%',
    height: hp(20),
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(30),
  },
  poweredByText: {
    fontSize: 10,
    lineHeight: 16,
    color: COLOR_WHITE,
  },
})
