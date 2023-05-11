import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from '../List';
import {ThemeContext, useTheme} from '../../theme';
import {COLOR_YELLOW, themes} from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBackLeft({props, to}) {
  const {theme} = useTheme();
  const navigation = useNavigation()
  const goto = () => {
    if (to) {
      navigation.navigate(to);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerLeft}>
      <TouchableOpacity style={styles.headerLeft} onPress={() => goto()}>
        <Icon size={24} name="arrow-left" color={COLOR_YELLOW} />
        <Text
          style={{
            marginHorizontal: 8,
            fontSize: 17,
            fontWeight: '500',
            lineHeight: 21,
            fontFamily: 'Hind Vadodara',
            color: COLOR_YELLOW,
          }}>
          Back {to}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
