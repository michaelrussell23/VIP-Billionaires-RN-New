import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Image} from 'react-native';
import {COLOR_WHITE, COLOR_YELLOW, themes} from '../../../constants/colors';
import {useTheme} from '../../../theme';
import {VectorIcon} from '../../../containers/VectorIcon';
import {MAX_NUMBER_OF_MEDIA_PER_POST} from '../../../constants/app';

const {width} = Dimensions.get('screen');
const PAGE_SIZE = 50;
const ITEM_WIDTH = width / 4;

const Gallery = ({onUpdate, selectedMedias, assetType}) => {
  const {theme} = useTheme();
  const [medias, setMedias] = useState([]);
  const [end_cursor, setEndCursor] = useState('');
  const [has_next_page, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  const onSelect = media => {
    if (selectedMedias.length < MAX_NUMBER_OF_MEDIA_PER_POST) onUpdate([...selectedMedias, media]);
  };

  const unSelect = media => {
    onUpdate([...selectedMedias.filter(({uri}) => !(uri === media.uri))]);
  };

  const isSelected = useCallback(
    media => {
      return !!selectedMedias.find(({uri}) => uri === media.uri);
    },
    [selectedMedias],
  );

  const loadMedias = () => {
    if (!has_next_page) return;
    let options = {first: PAGE_SIZE, assetType};
    if (end_cursor) options = {first: PAGE_SIZE, assetType, after: end_cursor};
    setLoading(true);
    CameraRoll.getPhotos(options)
      .then(res => {
        const list = res.edges.map(e => e.node.image);
        setHasNextPage(res.page_info.has_next_page);
        setEndCursor(res.page_info.end_cursor);
        setMedias([...medias, ...list]);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedias();
  }, []);

  return (
    <FlatList
      data={medias}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <MediaItem
            uri={item.uri}
            selected={isSelected(item)}
            theme={theme}
            onPress={() => (isSelected(item) ? unSelect(item) : onSelect({...item, assetType}))}
          />
        );
      }}
      numColumns={4}
      onEndReached={loadMedias}
      ListFooterComponent={() => (loading ? <ActivityIndicator size="small" color={themes[theme].textColor} /> : null)}
      ListFooterComponentStyle={{marginTop: 10}}
    />
  );
};

const MediaItem = ({uri, selected, onPress, theme}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.imageContainer, {borderColor: themes[theme].borderColor}]}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        source={{uri}}
      />
      {selected && (
        <View style={styles.mask}>
          <View style={styles.selectedIcon}>
            <View style={styles.icon}>
              <VectorIcon type={'Entypo'} name={'check'} color={COLOR_WHITE} size={8} />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderWidth: 1,
  },
  mask: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    backgroundColor: 'rgba(0,0,0,.63)',
  },
  selectedIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 7,
    top: 7,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.23)',
  },
  icon: {
    backgroundColor: COLOR_YELLOW,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
