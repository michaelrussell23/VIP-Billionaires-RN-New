import React, { useState } from 'react'
import ProfileDataPlaceholder from '../ProfileDataPlaceholder'
import BasicInfoModal from '../BasicInfoModal'
import BasicInfoUploaded from '../../../containers/BasicInfoUploaded'
import i18n from '../../../i18n'

const BasicInfoUpdate = ({ userInfo, onUpdate }) => {
  const { displayName, gender, birthday, phone, city } = userInfo
  const [modalVisible, setModalVisible] = useState(false)
  const onCancel = () => {
    onUpdate({
      gender: '',
      displayName: '',
      birthday: '',
      city: '',
      phone: '',
    });
  };
  if (!displayName) {
    return (
      <>
        <ProfileDataPlaceholder
          title={i18n.t('update_basic_information')}
          onPress={() => setModalVisible(true)}
        />
        <BasicInfoModal isVisible={modalVisible} close={() => setModalVisible(false)} onUpdate={onUpdate} />
      </>
    )
  }

  return (
    <BasicInfoUploaded
      name={userInfo.displayName}
      gender={gender}
      dob={birthday}
      phone={phone}
      location={city}
      showCloseIcon
      onCancel={onCancel}
    />
  )
}

export default BasicInfoUpdate
