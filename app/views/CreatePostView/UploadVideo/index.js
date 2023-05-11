import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import ButtonAction from '../ButtonAction';
import i18n from '../../../i18n';
import MediaPickerModal from '../MediaPickerModal';
import {MEDIA_PICKER_TYPE_VIDEO} from '../../../constants/app';

const UploadVideo = ({onNextPress}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ButtonAction
        title={i18n.t('video')}
        iconType="MaterialCommunityIcons"
        iconName="video"
        iconSize={24}
        onPress={() => setVisible(true)}
      />

      <MediaPickerModal
        visible={visible}
        close={() => setVisible(false)}
        mediaType={MEDIA_PICKER_TYPE_VIDEO}
        onNextPress={onNextPress}
      />
    </>
  );
};

export default UploadVideo;

const styles = StyleSheet.create({});
