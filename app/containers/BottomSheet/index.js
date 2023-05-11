import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {COLOR_WHITE} from '../../constants/colors';

const BottomSheet = ({visible, close}) => {
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={close}
      onBackdropPress={close}
      swipeDirection={['down']}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={{backgroundColor: COLOR_WHITE, padding: 20}} />
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
