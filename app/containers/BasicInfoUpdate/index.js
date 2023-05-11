import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ProfileDataPlaceholder from '../ProfileDataPlaceholder';
import i18n from '../../i18n';
import Modal from 'react-native-modal';
import BottomSheet from '../BottomSheet';

const BasicInfoUpdate = ({name, gender, dob, phone, location}) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (!name)
    {return (
      <>
        <ProfileDataPlaceholder title={i18n.t('update_basic_information')} onPress={() => setModalVisible(true)} />
        <BottomSheet visible={modalVisible} close={() => setModalVisible(false)} />
      </>
    );}

  return (
    <View>
      <Text> BasicInfoUpdate</Text>
    </View>
  );
};

export default BasicInfoUpdate;
