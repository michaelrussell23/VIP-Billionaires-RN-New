import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from '../List';
import {ThemeContext, useTheme} from '../../theme';
import {themes} from '../../constants/colors';

export default function HeaderLeft({props, to}) {
  const {theme} = useTheme();
  const goto = () => {
    if (to) {
      props.navigation.navigate(to);
    } else {
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.headerLeft}>
      <TouchableOpacity style={styles.headerLeft} onPress={() => goto()}>
        <Icon size={24} name="arrow-left" color={themes[theme].titleColor} />
        <Text
          style={{
            marginHorizontal: 8,
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 21,
            color: themes[theme].titleColor,
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
