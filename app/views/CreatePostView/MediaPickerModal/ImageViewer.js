import React, {useRef, useState} from 'react';
import {ImageBackground, Animated, Easing} from 'react-native';
import {Pressable} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR_GRAY_DARK, COLOR_WHITE, themes} from '../../../constants/colors';
import {VectorIcon} from '../../../containers/VectorIcon';
import {useTheme} from '../../../theme';

const DEFAULT_HEIGHT = 120;

const ImageViewer = ({url}) => {
  const {theme} = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [scaleStatus, setScaleStatus] = useState(0);

  handleAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: !scaleStatus,
      duration: 300,
      easing: Easing.ease,
    }).start(() => setScaleStatus(v => !v));
  };

  const scaleY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [DEFAULT_HEIGHT, 350],
  });

  if (!url)
    return (
      <View
        style={[
          styles.container,
          styles.noImageContainer,
          {borderColor: themes[theme].borderColor, backgroundColor: themes[theme].messageOwnBackground},
        ]}>
        <Text style={[styles.noImageText, {color: themes[theme].textColor}]}>No selected Image</Text>
      </View>
    );

  return (
    <Animated.View style={[styles.container, {height: scaleY}]}>
      <ImageBackground source={{uri: url}} style={styles.image} />
      <Pressable style={styles.scaleBtn} onPress={handleAnimation}>
        <VectorIcon
          type={'Entypo'}
          name={'chevron-left'}
          color={COLOR_GRAY_DARK}
          size={12}
          style={styles.iconStyle}
        />
        <VectorIcon
          type={'Entypo'}
          name={'chevron-right'}
          color={COLOR_GRAY_DARK}
          size={12}
          style={styles.iconStyle}
        />
      </Pressable>
    </Animated.View>
  );
};

export default ImageViewer;

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
    height: DEFAULT_HEIGHT,
    borderRadius: 6,
    marginVertical: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scaleBtn: {
    backgroundColor: COLOR_WHITE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    position: 'absolute',
    left: 9,
    bottom: 13,
    padding: 2,
    transform: [{rotate: '-45deg'}],
  },
});
