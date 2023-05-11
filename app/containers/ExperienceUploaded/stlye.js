import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    height: 97,
    paddingLeft: 17,
    marginVertical: 5,
  },
  jobTitle: {
    marginBottom: 3,
    fontSize: 16,
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    lineHeight: 22,
  },
  companyNameAndNumberOfYears: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 7,
  },
  salaryText: {
    color: '#F5BF4D',
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
  },
  closeIcon: {
    position: 'absolute',
    top: 18,
    right: 20,
  },
})

export default styles
