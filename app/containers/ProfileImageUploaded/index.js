import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { Avatar } from 'react-native-paper'

import styles from './style'
import { VectorIcon } from '../VectorIcon'
import i18n from '../../i18n'
import { COLOR_LIGHT_DARK, themes } from '../../constants/colors'
import { TouchableOpacity } from 'react-native'

const ProfileImageUploaded = ({ imageUrl, imageName, onCancel, changeImage }) => {
  const displayFileName = useMemo(() => {
    if (imageName.length < 20) {return imageName}
    return '...' + imageName.substring(imageName.length - 20, imageName.length)
  }, [imageName])

  return (
    <TouchableOpacity style={{ padding: 2 }} activeOpacity={0.8} onPress={changeImage}>
      <View style={styles.container}>
        <Avatar.Image size={56} source={{ uri: imageUrl }} />
        <View style={styles.imageNameContainer}>
          <Text numberOfLines={1} style={styles.imageName}>
            {displayFileName}
          </Text>
          <View style={styles.uploadIconAndText}>
            <VectorIcon type="MaterialIcons" name="cloud-upload" size={14} color={COLOR_LIGHT_DARK} />
            <Text style={styles.uploadNewImageText}>{i18n.t('upload_new_image')}</Text>
          </View>
        </View>
        <VectorIcon
          type="Ionicons"
          name="close-outline"
          size={24}
          color={themes.light.textColor}
          style={styles.closeIcon}
          onPress={onCancel}
        />
      </View>
    </TouchableOpacity>
  )
}

export default ProfileImageUploaded
