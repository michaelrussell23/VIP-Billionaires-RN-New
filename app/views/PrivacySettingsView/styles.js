import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  header: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  loggedLabel: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    marginTop: 42,
    marginBottom: 20,
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  itemLeft: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  itemCenter: {
    marginHorizontal: 10,
  },
})
