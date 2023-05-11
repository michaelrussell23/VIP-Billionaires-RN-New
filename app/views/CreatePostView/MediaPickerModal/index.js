import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from '../../../theme';
import {COLOR_YELLOW, themes} from '../../../constants/colors';
import i18n from '../../../i18n';
import {VectorIcon} from '../../../containers/VectorIcon';
import {SafeAreaView} from 'react-native';
import ImageViewer from './ImageViewer';
import Gallery from './Gallery';
import VideoPlayer from './VideoPlayer';
import {MEDIA_PICKER_TYPE_IMAGE, MEDIA_PICKER_TYPE_VIDEO} from '../../../constants/app';

const MediaPickerModal = ({visible, close, mediaType, onNextPress}) => {
  mediaType = mediaType || MEDIA_PICKER_TYPE_IMAGE;
  const {theme} = useTheme();
  const [medias, setMedias] = useState([]);

  const getUrl = useMemo(() => {
    return !!medias.length ? medias[medias.length - 1].uri : undefined;
  }, [medias]);

  const onClose = () => {
    setMedias([]);
    close();
  };

  const onComplete = () => {
    onNextPress(medias);
    setMedias([]);
    close();
  };

  return (
    <Modal isVisible={visible} onSwipeComplete={onClose} style={{margin: 0}}>
      <SafeAreaView style={{flex: 1, backgroundColor: themes[theme].backgroundColor}}>
        <View style={[styles.container]}>
          <View style={{paddingHorizontal: 16}}>
            <View style={styles.header}>
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'close'}
                color={themes[theme].textColor}
                size={32}
                onPress={onClose}
              />
              <Text style={[styles.title, {color: themes[theme].titleColor}]}>{i18n.t('New_post')}</Text>
              <Text onPress={onComplete} style={styles.nextText}>
                {i18n.t('Next')}
              </Text>
            </View>

            {mediaType === MEDIA_PICKER_TYPE_IMAGE ? <ImageViewer url={getUrl} /> : <VideoPlayer uri={getUrl} />}
            <View style={[styles.row, styles.spaceBetween, {marginBottom: 13}]}>
              <View style={[styles.row]}>
                <Text style={[styles.subTitle, {color: themes[theme].textColor}]}>Recent</Text>
                <VectorIcon
                  type={'Entypo'}
                  name={'chevron-small-down'}
                  color={themes[theme].textColor}
                  size={18}
                  onPress={close}
                />
              </View>
              <Text style={[styles.subTitle, {color: themes[theme].textColor}]}>{medias.length} Selected</Text>
            </View>
          </View>

          {mediaType === MEDIA_PICKER_TYPE_IMAGE ? (
            <Gallery onUpdate={setMedias} selectedMedias={medias} assetType={MEDIA_PICKER_TYPE_IMAGE} />
          ) : (
            <Gallery onUpdate={setMedias} selectedMedias={medias} assetType={MEDIA_PICKER_TYPE_VIDEO} />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MediaPickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  title: {
    fontFamily: 'Hind Vadodara',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
  },
  nextText: {
    color: COLOR_YELLOW,
    fontFamily: 'Hind Vadodara',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Hind Vadodara',
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
