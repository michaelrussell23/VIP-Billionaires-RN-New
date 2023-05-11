import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'
import { themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { VectorIcon } from '../../containers/VectorIcon'
import SidebarItem from '../SidebarView/SidebarItem'
import styles from './styles'
import firebase from '@react-native-firebase/app'
import moment from 'moment'
import { getDeviceModel, isIOS } from '../../utils/deviceInfo'
import UpdateEmailModal from './UpdateEmailModal'
import UpdatePasswordModal from './UpdatePasswordModal'
import I18n from '../../i18n'
import DialogInput from 'react-native-dialog-input'
import firebaseSdk from '../../lib/firebaseSdk'
import { showErrorAlert } from '../../lib/info'
import ActivityIndicator from '../../containers/ActivityIndicator'

const PrivacySettingsView = (props) => {
  const lastSignInTime = firebase.auth().currentUser.metadata.lastSignInTime
  const { theme, navigation, user } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [password, setPassword] = useState(false)
  const [isShowUpdateEmail, onShowUpdateEmailModal] = useState(false)
  const [isShowUpdatePassword, onShowUpdatePasswordModal] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
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

  const confirmPassword = (password) => {
    setIsLoading(true)
    firebaseSdk
      .signInWithEmail(user.email, password)
      .then(_ => {
        onShowUpdateEmailModal(true)
        setIsLoading(false)
        setPassword(password)
      })
      .catch(err => {
        setPassword(null)
        setIsLoading(false)
        showErrorAlert(I18n.t('error-invalid-password'))
        console.log('error', err)
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
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
          <Text style={[styles.title, { color: themes[theme].titleColor }]}>Privacy Settings</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
          <Text style={[styles.title, { color: themes[theme].titleColor, fontSize: 14 }]}>Update Email Address</Text>
        </View>
        <View style={[styles.container, { backgroundColor: themes[theme].buttonBackground, marginBottom: 16 }]}>
          <View style={styles.item}>
            <View style={styles.itemCenter}>
              <Text style={[styles.itemText, { color: themes[theme].subTextColor }]}>
                {user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShowPasswordConfirm(true)}>
            <VectorIcon type="MaterialCommunityIcons" name="pencil" color={themes[theme].titleColor} size={24} />
          </TouchableOpacity>
        </View>

        <SidebarItem
          text={'Change Password'}
          onPress={() => onShowUpdatePasswordModal(true)}
          theme={theme}
          hasRight
        />

        <Text style={[styles.loggedLabel, { color: themes[theme].titleColor }]}>You logged in using</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {isIOS ? (
            <VectorIcon type="AntDesign" name="apple1" color={themes[theme].textColor} size={32} />

          ) : (
            <VectorIcon type="AntDesign" name="android" color={themes[theme].textColor} size={32} />
          )}

          <View style={{ flex: 1, alignSelf: 'center', marginHorizontal: 16 }}>
            <Text style={{
              fontFamily: 'Raleway',
              fontSize: 14,
              fontWeight: '600',
              lineHeight: 16,
              color: themes[theme].textColor,
              flex: 1,
              alignItems: 'center',
              marginBottom: 4,
            }}>
              {getDeviceModel}
            </Text>
            <Text style={{
              fontFamily: 'Raleway',
              fontSize: 12,
              lineHeight: 14,
              color: themes[theme].textColor,
              alignItems: 'center',
            }}>
              {moment(lastSignInTime).format('DD MMMM YYYY H:mm A')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <DialogInput
        isDialogVisible={isShowPasswordConfirm}
        textInputProps={{ secureTextEntry: true }}
        title={'Update Email'}
        message={'Please enter your password to confirm!'}
        hintInput={I18n.t('please_enter_password')}
        submitInput={(password) => {
          if (password && password !== '') {
            setShowPasswordConfirm(false)
            confirmPassword(password)
          }
        }}
        closeDialog={() => {setShowPasswordConfirm(false)}}
      />

      <UpdateEmailModal
        isShow={isShowUpdateEmail} theme={theme}
        password={password}
        onClose={() => onShowUpdateEmailModal(false)}
      />

      <UpdatePasswordModal
        isShow={isShowUpdatePassword} theme={theme}
        onClose={() => onShowUpdatePasswordModal(false)}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PrivacySettingsView))
