import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    fontFamily: 'Raleway',
    fontSize: 24,
    lineHeight: 26,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontSize: 12,
    lineHeight: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'column',
    marginLeft: 16,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  itemText: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  itemPost: {
    fontFamily: 'Raleway',
    fontSize: 12,
    lineHeight: 20,
  },
  unBlockText: {
    paddingVertical: 4,
    textAlign: 'center',
  },
  blockText: {
    paddingVertical: 4,
    textAlign: 'center',
  },
})
