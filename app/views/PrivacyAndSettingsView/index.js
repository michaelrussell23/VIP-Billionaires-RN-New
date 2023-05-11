import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'

import { COLOR_LIGHT_DARK, COLOR_RED, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import styles from './styles'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { VectorIcon } from '../../containers/VectorIcon'
import SidebarItem from '../SidebarView/SidebarItem'
import AccountSettingsModal from './AccountSettingsModal'
import { useNavigation } from '@react-navigation/native'
import I18n from '../../i18n'
import DialogInput from 'react-native-dialog-input'
import firebaseSdk from '../../lib/firebaseSdk'
import { showErrorAlert } from '../../lib/info'
import { logout as logoutAction } from '../../actions/login'
import ActivityIndicator from '../../containers/ActivityIndicator'

const PrivacyAndSettingsView = ({ theme, user, logout }) => {
  const navigation = useNavigation()
  const [isShowAccountSettings, onShowAccountSettings] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.header} onPress={() => navigation.toggleDrawer()}>
          <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      title: null,
      headerRight: () => (<></>),
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  const deleteAccount = (password) => {
    setIsLoading(true)
    firebaseSdk
      .signInWithEmail(user.email, password)
      .then(_ => {
        firebaseSdk
          .deleteUser(user.id)
          .then(_ => {
            setIsLoading(false)
            if (global.unSubscribeRoom) {
              global.unSubscribeRoom()
              global.unSubscribeRoom = undefined
            }
            logout()
          })
          .catch(err => {
            setIsLoading(false)
            console.log('error', err)
          })
      })
      .catch(err => {
        setIsLoading(false)
        showErrorAlert(I18n.t('error-invalid-password'))
        console.log('error', err)
      })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themes[theme].backgroundColor,
      }}>
      <StatusBar />
      {isLoading && (
        <ActivityIndicator absolute theme={theme} size={'large'} />
      )}
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: themes[theme].backgroundColor,
          paddingHorizontal: 16,
        }}
        {...scrollPersistTaps}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <VectorIcon style={{ marginRight: 16 }} type="MaterialCommunityIcons" name="shield-lock"
                      color={COLOR_LIGHT_DARK} size={20} />
          <Text style={[styles.title, { color: themes[theme].titleColor }]}>Privacy and Settings</Text>
        </View>
        <SidebarItem
          text={'Account Settings'}
          onPress={() => onShowAccountSettings(true)}
          theme={theme}
          hasRight
        />
        <SidebarItem
          text={'Privacy Setting'}
          onPress={() => navigation.navigate('PrivacySettings')}
          theme={theme}
          hasRight
        />

        <View style={{ marginTop: 56, marginBottom: 16 }}>
          <Text style={[styles.title, { color: themes[theme].titleColor, margin: 0 }]}>Other Settings</Text>
        </View>
        <SidebarItem text={'Blocked Users'} onPress={() => navigation.navigate('Block')} theme={theme} hasRight />
        <SidebarItem text={'Delete Account'} textStyle={{ color: COLOR_RED }} onPress={() => setShowDeleteAccount(true)} theme={theme} />
      </ScrollView>

      <AccountSettingsModal isShow={isShowAccountSettings} theme={theme} onClose={() => onShowAccountSettings(false)} />
      <DialogInput
        isDialogVisible={showDeleteAccount}
        textInputProps={{ secureTextEntry: true }}
        title={I18n.t('del_account_title')}
        message={I18n.t('del_account_text')}
        hintInput={I18n.t('please_enter_password')}
        submitInput={(password) => {
          if (password && password !== '') {
            setShowDeleteAccount(false)
            deleteAccount(password)
          }
        }}
        closeDialog={() => {setShowDeleteAccount(false)}}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(logoutAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PrivacyAndSettingsView))
