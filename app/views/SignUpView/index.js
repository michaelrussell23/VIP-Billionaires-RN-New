import React, { useRef, useState } from 'react'
import { Image, SafeAreaView, Text, View, ScrollView, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import sharedStyles from '../Styles'
import StatusBar from '../../containers/StatusBar'
import styles from './styles'
import Button from '../../containers/Button'
import images from '../../assets/images'
import { isValidEmail } from '../../utils/validators'
import { showErrorAlert, showToast } from '../../lib/info'
import firebaseSdk from '../../lib/firebaseSdk'
import I18n from '../../i18n'
import KeyboardView from '../../containers/KeyboardView'
import { CURRENT_USER } from '../../constants/keys'
import { loginSuccess as loginSuccessAction } from '../../actions/login'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { sendEmail } from '../../utils/sendmail'
import FloatingTextInput from '../../containers/FloatingTextInput'

const theme = 'light'

const SignUpView = props => {
  const { loginSuccess } = props
  const navigation = useNavigation()
  const [state, setState] = useState({
    email: '',
    password: '',
    confirm_password: '',
    topScrollEnable: true,
    allowTerms: false,
    isLoading: false,
  })

  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const confirmPasswordInput = useRef(null)

  const onGoToSignIn = () => {
    navigation.navigate('SignIn')
  }

  const isValid = () => {
    const { password, confirm_password, email } = state

    if (!email.length) {
      showToast(I18n.t('please_enter_email'))
      emailInput.current.focus()
      return false
    }
    if (!isValidEmail(email)) {
      showToast(I18n.t('error-invalid-email-address'))
      emailInput.current.focus()
      return false
    }
    if (!password.length) {
      showToast(I18n.t('please_enter_password'))
      passwordInput.current.focus()
      return false
    }
    if (password.length < 6) {
      showToast(I18n.t('please_enter_password_with_min_length_6'))
      passwordInput.current.focus()
      return false
    }
    if (password !== confirm_password) {
      showToast(I18n.t('error-invalid-password-repeat'))
      confirmPasswordInput.current.focus()
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (isValid()) {
      setState({ ...state, isLoading: true })
      const { email, password } = state

      const user = { ...state }
      const mailBody = '\nEmail : ' + email
      sendEmail('info@zedinternational.net', 'A new user registered', mailBody)

      firebaseSdk
        .signUp(user)
        .then(async () => {
          showToast(I18n.t('Register_complete'))
          firebaseSdk
            .signInWithEmail(email, password)
            .then(async user => {
              await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user))
              setState({ ...state, isLoading: false })
              loginSuccess(user)
            })
            .catch(error => {
              navigation.navigate('SignIn')
            })
        })
        .catch(() => {
          showErrorAlert(I18n.t('Register_fail'))
          setState({ ...state, isLoading: false })
        })
    }
  }

  return (
    <ImageBackground style={styles.container} source={images.intro_background}>
      <SafeAreaView style={sharedStyles.safeAreaContainer}>
        <StatusBar />
        <KeyboardView style={sharedStyles.container} keyboardVerticalOffset={128}>
          <ScrollView
            style={sharedStyles.container}
            {...scrollPersistTaps}
            keyboardShouldPersistTaps="handled">
            <View style={sharedStyles.headerContainer}>
              <Image style={styles.logo} source={images.logo} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.description}>
                <Text style={styles.loginTitle}>{I18n.t('sign_up')}</Text>
                <Text>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <Text
                    style={[{ ...sharedStyles.link}, styles.loginLinkText]}
                    onPress={onGoToSignIn}>
                    Log In{' '}
                  </Text>
                </Text>
              </View>
              <FloatingTextInput
                inputRef={emailInput}
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="oneTimeCode"
                label={I18n.t('Email')}
                placeholder={'Enter Your Email'}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={email => setState({ ...state, email })}
                theme={theme}
                onSubmitEditing={() => {
                  passwordInput.current.focus()
                }}
                autoCapitalize="none"
              />
              <FloatingTextInput
                inputRef={passwordInput}
                returnKeyType="next"
                secureTextEntry
                textContentType="oneTimeCode"
                label={'Create Password'}
                placeholder={'Enter Your Password'}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={value => setState({ ...state, password: value })}
                theme={theme}
                onSubmitEditing={() => {
                  confirmPasswordInput.current.focus()
                }}
              />
              <FloatingTextInput
                inputRef={confirmPasswordInput}
                returnKeyType="next"
                secureTextEntry
                textContentType="oneTimeCode"
                label={'Submit New Password'}
                placeholder={'Submit Your Password'}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={value =>
                  setState({ ...state, confirm_password: value })
                }
                theme={theme}
              />
              <Button
                style={styles.submitBtn}
                title={'Submit'}
                size="W"
                onPress={onSubmit}
                theme={theme}
              />
            </View>
          </ScrollView>
        </KeyboardView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
})

export default connect(null, mapDispatchToProps)(withTheme(SignUpView))
