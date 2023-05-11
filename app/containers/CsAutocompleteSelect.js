import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { COLOR_YELLOW, themes } from '../constants/colors'
import { VectorIcon } from './VectorIcon'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 0,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 56,
    borderColor: '#4A4A4A',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    color: '#585858',
    marginBottom: 5,
    fontSize: 14,
  },
})

const CsAutocompleteSelect = ({ data, onSelectItem, placeholder, theme, label, containerStyle }) => {
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState(false)

  const RightIcon = () => {
    return (
      <VectorIcon
        type={'Entypo'}
        name={show ? 'chevron-thin-up' : 'chevron-thin-right'}
        color={COLOR_YELLOW}
        size={12}
      />
    )
  }

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, containerStyle, focus ? { zIndex: 1 } : null]}>
        <AutocompleteDropdown
          clearOnFocus={true}
          closeOnBlur={true}
          closeOnSubmit={true}
          dataSet={data}
          onSelectItem={onSelectItem}
          textInputProps={{
            placeholder: placeholder,
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              fontFamily: 'Raleway',
              color: themes[theme].activeTintColor,
              fontSize: 14,
            },
            placeholderTextColor: themes[theme].borderColor,
          }}
          inputContainerStyle={{
            backgroundColor: 'transparent',
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          suggestionsListContainerStyle={{
            backgroundColor: '#FFF',
          }}
          containerStyle={{ width: '95%' }}
          showChevron={false}
        />
        <RightIcon />
      </View>
    </>
  )
}

export default CsAutocompleteSelect
