import { Dimensions, StyleSheet } from 'react-native'
import { COLOR_BTN_BORDER, COLOR_WHITE, COLOR_YELLOW } from '../../constants/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {},
  header: {
    fontFamily: 'Raleway',
    fontSize: 18,
    lineHeight: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 6,
    resizeMode: 'cover',
  },
  backImage: {
    width: width,
    height: 200,
  },
  icon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLOR_WHITE,
    borderRadius: 12,
    backgroundColor: COLOR_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgPlus: {
    position: 'absolute',
    top: -18,
    left: 42,
  },
  profileInfo: {
    alignItems: 'center',
    padding: 16,
  },
  profileTitle: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 26,
    alignSelf: 'center',
  },
  profileText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
  },
  submitBtn: {
    alignSelf: 'center',
  },
  details: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsTitle: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 26,
    alignSelf: 'center',
  },
  detailsText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
    alignSelf: 'center',
  },
  divider: {
    borderWidth: 0.5,
  },
  tabBar: {
    margin: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    margin: 4,
    alignItems: 'center',
  },
  activeTab: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLOR_BTN_BORDER,
  },
  tabText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
  },
})
