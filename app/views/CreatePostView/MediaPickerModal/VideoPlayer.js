import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Player from 'react-native-video-player';
import {themes} from '../../../constants/colors';
import {useTheme} from '../../../theme';
import {createThumbnail} from 'react-native-create-thumbnail';
import images from '../../../assets/images';

const VideoPlayer = ({uri}) => {
  const [thumbnail, setThumbnail] = useState(null);
  const {theme} = useTheme();

  useEffect(() => {
    setThumbnail(null);
    if (uri) {
      createThumbnail({
        url: uri,
        timeStamp: 2000,
      })
        .then(response => setThumbnail({uri: response.path}))
        .catch(err => {
          console.log({err});
          setThumbnail(require('../../../assets/images/video_thumb_default.png'));
        });
    }
  }, [uri]);

  if (!thumbnail)
    return (
      <View
        style={[
          styles.container,
          styles.noImageContainer,
          {borderColor: themes[theme].borderColor, backgroundColor: themes[theme].messageOwnBackground},
        ]}>
        {!uri ? (
          <Text style={[styles.noImageText, {color: themes[theme].textColor}]}>No selected Video</Text>
        ) : (
          <ActivityIndicator size="small" color={themes[theme].textColor} />
        )}
      </View>
    );

  return (
    <View style={{marginVertical: 15}}>
      <Player video={{uri}} videoWidth={1600} videoHeight={900} thumbnail={thumbnail} />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  noImageContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Raleway',
  },
  container: {
    height: 200,
    borderRadius: 6,
    marginVertical: 15,
    overflow: 'hidden',
  },
});
