import React, {memo, useEffect, useMemo, useState} from 'react';
import {Pressable} from 'react-native';
import {StyleSheet, Image, View, FlatList, Dimensions, Text} from 'react-native';
import {MEDIA_PICKER_TYPE_IMAGE} from '../../../constants/app';
import {COLOR_RED, COLOR_WHITE} from '../../../constants/colors';
import {VectorIcon} from '../../../containers/VectorIcon';
import {useUpload} from '../../../hooks';
import firebaseSdk from '../../../lib/firebaseSdk';
import {LOCALSTORAGE} from '../../../utils/localStorage';

const {width} = Dimensions.get('screen');
const ITEM_SIZE = width / 4;

const SelectedMediaList = ({medias, localPostID, onUpdate}) => {
  const [list, setList] = useState([]);

  const getListLength = useMemo(() => {
    return list.filter(item => !item.deleted).length;
  }, [list]);

  const onDelete = index => {
    let newList = [...list.map((item, i) => (index === i ? {...item, deleted: true} : item))];
    setList(newList);
    onUpdate(newList);
  };

  useEffect(() => {
    if (!(medias.length === list.length)) setList(medias);
  }, [medias]);

  if (!getListLength) return null;
  return (
    <View>
      <FlatList
        horizontal
        data={list}
        renderItem={({item, index}) => {
          if (!!item.deleted) return null;
          return <MediaItem {...item} index={index} localPostID={localPostID} onDelete={() => onDelete(index)} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const MediaItem = memo(({uri, assetType, index, localPostID, onDelete}) => {
  const type = assetType === MEDIA_PICKER_TYPE_IMAGE ? firebaseSdk.STORAGE_TYPE_PHOTO : firebaseSdk.STORAGE_TYPE_VIDEO;
  let milliSeconds = new Date().getTime();
  const localID = `${type}_${milliSeconds}_${index}`;
  const {url, progress} = useUpload({uri, id: localID});

  //The media is saved locally and will be used on post upload
  const saveLocalMedia = () => {
    LOCALSTORAGE.save({
      key: localPostID,
      id: localID.replaceAll('_', ''),
      data: {url, type},
    });
  };

  const removeMedia = () => {
    LOCALSTORAGE.remove({
      key: localPostID,
      id: localID.replaceAll('_', ''),
    });
    onDelete();
  };

  useEffect(() => {
    if (url) saveLocalMedia();
  }, [url]);

  return (
    <View style={styles.imageContainer}>
      <Image source={{uri}} style={styles.image} />

      {!url ? (
        <View style={styles.mask}>
          <View style={styles.selectedIcon}>
            <Text style={styles.progress}>{progress} %</Text>
          </View>
        </View>
      ) : (
        <Pressable onPress={removeMedia} style={styles.iconContainer}>
          <VectorIcon type={'EvilIcons'} name={'trash'} color={COLOR_WHITE} size={32} />
        </Pressable>
      )}
    </View>
  );
});

export default SelectedMediaList;

const styles = StyleSheet.create({
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 8,
    marginRight: 10,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mask: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: 'rgba(0,0,0,.40)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Hind Vadodara',
    color: COLOR_WHITE,
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: COLOR_RED,
  },
});
