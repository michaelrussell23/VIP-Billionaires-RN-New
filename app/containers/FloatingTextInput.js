import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { TextInput } from 'react-native';

import { COLOR_BORDER, COLOR_RED, COLOR_WHITE, themes } from '../constants/colors';

const styles = StyleSheet.create({
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
    color: COLOR_RED,
    marginTop: 10,
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  labelText: {
    fontFamily: 'Raleway',
    marginBottom: 8,
    marginLeft: 0,
    fontSize: 14,
    lineHeight: 16,
  },
})

const FloatingTextInput = props => {
  const {
    label,
    required,
    error,
    loading,
    secureTextEntry,
    containerStyle,
    inputRef,
    iconLeft,
    iconRight,
    inputStyle,
    wrapStyle,
    testID,
    placeholder,
    theme,
    outlineColor,
    backgroundColor,
    multiline,
    value,
    isEditable,
    placeholderTextColor,
    ...inputProps
  } = props

  const [showPassword, setShowPassword] = useState(!secureTextEntry)

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (<Text style={[styles.labelText, { color: themes[theme].textColor }]}>{label}</Text>)}
      <View style={[styles.container, {
        borderColor: error ? COLOR_RED : themes[theme].borderColor,
        height: multiline ? 123 : 56,
        backgroundColor: COLOR_WHITE,
      }]}>
        <TextInput
          ref={inputRef}
          value={value}
          style={[styles.textInput,
          {
            backgroundColor: backgroundColor ?? 'transparent',
            color: error ? COLOR_RED : themes[theme].tabActivatedColor,
          },
          ]}
          outlineColor={error ? COLOR_RED : outlineColor || COLOR_BORDER}
          activeOutlineColor={error ? COLOR_RED : themes[theme].textColor}
          theme={{
            colors: {
              text: error ? COLOR_RED : themes[theme].tabActivatedColor,
            },
          }}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : themes[theme].subTextColor}
          {...inputProps}
          multiline={multiline}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

FloatingTextInput.defaultProps = {
  error: '',
}

export default FloatingTextInput
