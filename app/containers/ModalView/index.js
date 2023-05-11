import React from 'react';
import styles from './styles';
import {themes} from '../../constants/colors';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

const ModalView = props => {
  const {isShow, onClose, theme, title, children} = props;

  return (
    <Modal
      isVisible={isShow}
      avoidKeyboard
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View
        style={[styles.modalContent, {backgroundColor: themes[theme].backgroundColor}]}
        onPressOut={onClose}>
        <Text style={[styles.modalTitle, {color: themes[theme].activeTintColor}]}>{title}</Text>
        {children}
      </View>
    </Modal>
  );
};

export default ModalView;
