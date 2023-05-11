import React, { useState } from 'react'
import ProfileDataPlaceholder from '../ProfileDataPlaceholder'
import ImagePicker from 'react-native-image-crop-picker'
import { Alert } from 'react-native'
import ProfileImageUploaded from '../../../containers/ProfileImageUploaded'
import firebaseSdk from '../../../lib/firebaseSdk'
import i18n from '../../../i18n'
import { checkCameraPermission, checkPhotosPermission, imagePickerConfig } from '../../../utils/permissions'

const ProfileImageUpload = ({ imageUrl, imageName, onUpload }) => {
  const [loading, setLoading] = useState(false)

  // open camera
  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig)
        .then(image => {
          handleImage(image)
        })
        .catch(console.warn)
    }
  }

  // choose from gallery
  const chooseFromLibrary = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig)
        .then(image => {
          handleImage(image)
        })
        .catch(console.warn)
    }
  }

  const toggleAction = () => {
    Alert.alert('', i18n.t('Upload_profile_photo'), [
      {
        text: i18n.t('Cancel'),
        onPress: () => { },
      },
      {
        text: i18n.t('Take_a_photo'),
        onPress: () => {
          takePhoto()
        },
      },
      {
        text: i18n.t('Choose_a_photo'),
        onPress: () => {
          chooseFromLibrary()
        },
      },
    ])
  }

  const handleImage = async image => {
    setLoading(true)
    const image_url = await firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, image.path)
    onUpload({
      imageName: image.filename,
      imageUrl: image_url,
    })
    setLoading(false)
  }

  const onCancel = () => {
    onUpload({
      imageName: '',
      imageUrl: '',
    })
  }

  if (!imageUrl) {
    return (
      <ProfileDataPlaceholder
        title={i18n.t('upload_profile_image')}
        onPress={toggleAction}
        loading={loading}
      />
    )
  }

  return (
    <ProfileImageUploaded
      imageName={imageName}
      imageUrl={imageUrl}
      onCancel={onCancel}
      changeImage={toggleAction}
    />
  )
}

export default ProfileImageUpload
