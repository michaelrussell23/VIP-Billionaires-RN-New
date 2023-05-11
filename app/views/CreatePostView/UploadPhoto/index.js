import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import ButtonAction from '../ButtonAction';
import i18n from '../../../i18n';
import MediaPickerModal from '../MediaPickerModal';

const UploadPhoto = ({onNextPress}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ButtonAction
        title={i18n.t('Upload_Photo')}
        iconType="Entypo"
        iconName="images"
        onPress={() => setVisible(true)}
      />
      <MediaPickerModal visible={visible} close={() => setVisible(false)} onNextPress={onNextPress} />
    </>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({});
