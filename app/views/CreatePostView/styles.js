import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

export default StyleSheet.create({
  headerContainer: {
    marginVertical: 16,
    marginHorizontal: 18,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: 'grey',
  },
  userContainer: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'contain',
  },
  userName: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  roundInput: {
    borderWidth: 1,
    borderRadius: 8,
  },
  underlineInput: {
    marginHorizontal: 8,
    marginTop: 12,
  },
  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  videoContainer: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
  },
  textStyle: {
    minHeight: 150,
    textAlignVertical: 'top',
    maxHeight: height / 2.5,
    fontSize: 14,
    lineHeight: 19,
  },
  inputContainer: {
    // flexGrow: 1,
    paddingTop: 9,
    paddingBottom: 10,
    // paddingHorizontal: 8,
  },
  video: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  playIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
  },

  whatsOn: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
    fontFamily: 'Raleway',
    marginLeft: 12,
  },
});
