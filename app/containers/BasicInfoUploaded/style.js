import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    height: 130,
    paddingLeft: 17,
    marginVertical: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    elevation: 2,
    marginTop: 10,
  },

  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  phone: {
    fontFamily: 'Hind Vadodara',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 12.75,
    lineHeight: 22,
  },
  locationHomeImage: {
    width: 18,
    height: 18,
  },
  location: {
    fontFamily: 'Hind Vadodara',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 12,
    lineHeight: 22,
  },
  genderAndDob: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 7,
    lineHeight: 22,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default styles;
