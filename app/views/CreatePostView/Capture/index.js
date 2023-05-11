import React from 'react';
import {StyleSheet} from 'react-native';
import ButtonAction from '../ButtonAction';
import i18n from '../../../i18n';
import {checkCameraPermission, imagePickerConfig} from '../../../utils/permissions';
import {MEDIA_PICKER_TYPE_IMAGE} from '../../../constants/app';

const Capture = ({onCapture}) => {
  // open camera
  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig)
        .then(image => {
          onCapture([{uri: image.path, assetType: MEDIA_PICKER_TYPE_IMAGE}]);
        })
        .catch(console.warn);
    }
  };

  return (
    <>
      <ButtonAction title={i18n.t('Capture')} iconType="MaterialCommunityIcons" iconName="camera" onPress={takePhoto} />
    </>
  );
};

export default Capture;

const styles = StyleSheet.create({});
