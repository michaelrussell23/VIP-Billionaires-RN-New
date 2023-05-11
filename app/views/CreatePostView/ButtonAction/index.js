import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {themes} from '../../../constants/colors';
import {VectorIcon} from '../../../containers/VectorIcon';
import {useTheme} from '../../../theme';

const ButtonAction = ({title, iconName, iconType, onPress, iconSize}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, {backgroundColor: themes[theme].buttonBackground}]}>
      <View style={styles.titleContainer}>
        <VectorIcon
          type={iconType}
          name={iconName}
          color={themes[theme].textColor}
          size={iconSize || 20}
          style={styles.iconStyle}
        />
        <Text style={[styles.title, {color: themes[theme].titleColor}]}>{title}</Text>
      </View>

      <VectorIcon
        type={'Entypo'}
        name={'chevron-thin-right'}
        color={themes[theme].textColor}
        size={16}
        style={styles.iconStyle}
      />
    </TouchableOpacity>
  );
};

export default ButtonAction;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 16,
    paddingStart: 10,
    paddingEnd: 18,
    marginBottom: 9,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    fontFamily: 'Hind Vadodara',
    marginLeft: 23,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
