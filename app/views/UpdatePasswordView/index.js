import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from '../../theme'
import StatusBar from '../../containers/StatusBar'
import sharedStyles from '../Styles'
import styles from './styles'
import images from '../../assets/images'
import Button from '../../containers/Button'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import I18n from '../../i18n'
import { COLOR_BORDER } from '../../constants/colors'
import FloatingTextInput from '../../containers/FloatingTextInput'
import KeyboardView from '../../containers/KeyboardView'
import HeaderBackLeft from '../../containers/HeaderBackLeft'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const theme = 'light'

const UpdatePasswordView = (props) => {
  const navigation = useNavigation()
  const { loginSuccess } = props
  const [isLoading, setIsLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errNewPassword, setErrNewPassword] = useState('')
  const [errConfirmPassword, setErrConfirmPassword] = useState('')
  const newPasswordInput = useRef(null)
  const confirmPasswordInput = useRef(null)

  const isValid = () => {
    setErrNewPassword('')
    setErrConfirmPassword('')
    if (!newPassword.length) {
      setErrNewPassword(I18n.t('please_enter_password'))
      newPasswordInput.current.focus()
      return false
    }
    if (!confirmPassword.length) {
      setErrConfirmPassword(I18n.t('please_enter_password'))
      confirmPasswordInput.current.focus()
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (isValid()) {
      // setIsLoading(true)
      // To Do for update password api.
    }
  }

  return (
    <ImageBackground style={styles.container} source={images.intro_background}>
      <SafeAreaView style={sharedStyles.safeAreaContainer}>
        <StatusBar />
        <HeaderBackLeft props={navigation} />
        <KeyboardView style={sharedStyles.container} keyboardVerticalOffset={128}>
          <ScrollView
            style={sharedStyles.container}
            {...scrollPersistTaps}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[sharedStyles.headerContainer, { marginTop: hp(8.25) }]}>
              <Image style={styles.logo} source={images.logo} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.description}>
                <Text style={styles.loginTitle}>Update Password</Text>
                <Text style={styles.loginText}>Don't worry! It happens.</Text>
                <Text style={styles.descriptionText}>Please enter the address associated with your account.</Text>
              </View>
              <FloatingTextInput
                inputRef={newPasswordInput}
                iconLeft={images.password}
                label={'New Password'}
                placeholder={'Enter New Password'}
                placeholderTextColor={'#C4C4C4'}
                returnKeyType="send"
                textContentType="oneTimeCode"
                onChangeText={value => setNewPassword(value)}
                theme={theme}
                onSubmitEditing={() => {
                  newPasswordInput.current.focus()
                }}
                outlineColor={COLOR_BORDER}
                secureTextEntry
                error={errNewPassword}
              />
              <FloatingTextInput
                inputRef={confirmPasswordInput}
                iconLeft={images.password}
                label="Submit New Password"
                placeholder={'Confirm New Password'}
                placeholderTextColor={'#C4C4C4'}
                returnKeyType="send"
                textContentType="oneTimeCode"
                onChangeText={value => setConfirmPassword(value)}
                theme={theme}
                onSubmitEditing={() => {
                  confirmPasswordInput.current.focus()
                }}
                outlineColor={COLOR_BORDER}
                secureTextEntry
                error={errConfirmPassword}
              />
              <Button
                style={styles.submitBtn}
                title="Submit"
                size="W"
                onPress={onSubmit}
                loading={isLoading}
                theme={theme}
                pressingHighlight
              />
            </View>
          </ScrollView>
        </KeyboardView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const mapDispatchToProps = dispatch => ({})

export default connect(null, mapDispatchToProps)(withTheme(UpdatePasswordView))
