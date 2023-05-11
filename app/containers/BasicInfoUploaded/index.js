import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './style'
import { VectorIcon } from '../VectorIcon'
import images from '../../assets/images'
import { themes } from '../../constants/colors'

const theme = 'light'

const BasicInfoUploaded = ({ name, gender, dob, phone, location, showCloseIcon, onCancel }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.name, { color: themes[theme].titleColor }]}>{name}</Text>
        <Text style={[styles.genderAndDob, { color: themes[theme].textColor }]}>
          {gender} | {dob}
        </Text>
        <View style={styles.iconAndText}>
          <VectorIcon type="MaterialIcons" name="perm-phone-msg" color="#C4C4C4" size={18} />
          <Text style={[styles.phone, { color: themes[theme].textColor }]}>{phone}</Text>
        </View>
        <View style={styles.iconAndText}>
          <Image source={images.location_home_gray} style={styles.locationHomeImage} />
          <Text style={[styles.location, { color: themes[theme].textColor }]}>{location}</Text>
        </View>
      </View>
      {showCloseIcon && (
        <VectorIcon type="Ionicons" onPress={onCancel} name="close-outline" size={20} color="#858585" style={styles.closeIcon} />
      )}
    </View>
  )
}

export default BasicInfoUploaded
