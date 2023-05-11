import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CheckBox = React.memo(
  ({
     title,
     checked,
     checkedColor,
     unCheckedColor,
     checkedIcon,
     uncheckedIcon,
     textStyle,
     containerStyle,
     onPress,
   }) => (
    <TouchableOpacity
      style={{
        ...containerStyle,
        flexDirection: 'row',
        alignItems: 'center',
        height: 49,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 11,
        marginBottom: 5,
      }}
      onPress={onPress}>
      <Ionicons
        name={checked ? checkedIcon : uncheckedIcon}
        size={12}
        color={checked ? checkedColor : unCheckedColor}
      />
      {title ? (
        <Text style={{ marginLeft: 8, ...textStyle }}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  ),
)
export default CheckBox
