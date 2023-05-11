import React from 'react'
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native'
import sharedStyles from '../views/Styles'
import {
  COLOR_DANGER,
  COLOR_YELLOW,
  themes,
} from '../constants/colors'
import { Genders } from '../constants/app'
import { VectorIcon } from './VectorIcon'

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontFamily: 'Raleway',

  },
  required: {
    marginBottom: 10,
    color: COLOR_DANGER,
    fontSize: 14,
    fontWeight: '700',
  },
  selectText: {
    ...sharedStyles.textRegular,
    fontSize: 14,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    borderRadius: 8,
    flex: 1,
  },
  optionText: {
    fontFamily: 'Raleway',
  },
})

const CsSelectGender = (props) => {
  const {
    label,
    value,
    required,
    containerStyle,
    theme,
    itemStyle,
  } = props

  const setCheck = value => {
    props.onChange(value)
  }

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label ? (
        <Text
          contentDescription={null}
          accessibilityLabel={null}
          style={[styles.label, { color: themes[theme].textColor }]}>
          {label}
          {required ? (
            <Text
              contentDescription={null}
              accessibilityLabel={null}
              style={[styles.required]}>{` ${required}`}</Text>
          ) : null}
        </Text>
      ) : null}
      <View style={styles.wrap}>
        {Genders.map((val, index) => (
          <Pressable
            onPress={() => setCheck(val.value)}
            key={index}
            style={[styles.optionContainer, itemStyle, { marginRight: index === 0 ? 6.5 : 0, marginLeft: index === 1 ? 6.5 : 0 }]}>
            <Text style={[styles.selectText, { color: value === val.value ? themes[theme].titleColor : themes[theme].borderColor }]}>{val.text}</Text>
            {value === val.value && (
              <VectorIcon type="MaterialCommunityIcons" name="checkbox-marked-circle" color={COLOR_YELLOW} size={18} />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default CsSelectGender
