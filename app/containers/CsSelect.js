import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import sharedStyles from '../views/Styles'
import { COLOR_YELLOW, themes } from '../constants/colors'
import { VectorIcon } from './VectorIcon'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    // width: width * 0.92,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 56,
    borderColor: '#4A4A4A',
    flex: 1,
  },
  label: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    color: '#585858',
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 17,
  },
  iosPadding: {
    height: 50,
    justifyContent: 'center',
  },
  wrap: {
    position: 'relative',
  },
  viewContainer: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    flexGrow: 1,
  },
  pickerText: {
    ...sharedStyles.textRegular,
    fontSize: 14,
    paddingHorizontal: 14,
  },
  icon: {
    marginRight: 12,
  },
  iosIcon: {
    paddingVertical: 10,
  },
  loading: {
    padding: 0,
  },
  iconStyle: {},
  modalItems: {
    width: width * 0.9,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    maxHeight: height * 0.6,
    paddingTop: 40,
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 9999,
  },
  itemContainer: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})

export const CsSelect = React.memo(
  ({ label, options = [], placeholder, value, theme, onSelect, containerStyle }) => {
    const [selected, setSelected] = useState(false)

    const items = options.map(option => ({
      label: option,
      value: option,
    }))

    const [showItems, setShowItems] = useState(false)

    const onSelectItem = value => {
      onSelect(value)
      setSelected(true)
      setShowItems(false)
    }

    return (
      <>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={() => setShowItems(!showItems)}>
            <Text style={[{ color: selected ? '#2F3131' : '#C4C4C4' }]}>{!selected ? placeholder : value}</Text>
            <VectorIcon
              type={'Entypo'}
              name={'chevron-thin-right'}
              color={COLOR_YELLOW}
              size={12}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <Modal isVisible={showItems} onBackdropPress={() => setShowItems(false)}>
          <View style={styles.modalItems}>
            <VectorIcon
              type="AntDesign"
              name="close"
              size={20}
              style={styles.closeIcon}
              onPress={() => setShowItems(false)}
            />
            <ScrollView>
              {items.map(item => (
                <TouchableOpacity style={styles.itemContainer} onPress={() => onSelectItem(item.value)}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </>
    )
  },
)
