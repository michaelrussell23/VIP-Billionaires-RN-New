import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import styles from './styles'
import FloatingTextInput from '../../containers/FloatingTextInput'
import Button from '../../containers/Button'
import I18n from '../../i18n'
import { isValidEmail } from '../../utils/validators'
import ModalView from '../../containers/ModalView'
import firebaseSdk from '../../lib/firebaseSdk'
import { showErrorAlert, showToast } from '../../lib/info'
import { loginReset as loginResetAction, setUser as setUserAction } from '../../actions/login'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CURRENT_USER } from '../../constants/keys'

const UpdateEmailModal = ({ isShow, onClose, theme, user, setUser, password, loginReset }) => {
  const [email, setEmail] = useState(user.email)
  const [isLoading, setIsLoading] = useState(false)
  const [errEmail, setErrEmail] = useState('')
  const emailInput = useRef(null)

  useEffect(() => {
    setEmail(user.email)
    if (isShow) {
      isValid()
    }
  }, [isShow, user])

  const isValid = () => {
    setErrEmail('')
    if (!email.length) {
      setErrEmail(I18n.t('please_enter_email'))
      emailInput.current.focus()
      return false
    }
    if (!isValidEmail(email)) {
      setErrEmail(I18n.t('error-invalid-email-address'))
      emailInput.current.focus()
      return false
    }
    return true
  }
  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true)

      firebaseSdk
        .reauthenticate(user.email, password)
        .then(() => {
          firebaseSdk
            .updateEmail(email)
            .then(async (data) => {
              const newUser = { ...user, email: email }
              await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(newUser))
              setUser(newUser)
              setIsLoading(false)
              onClose()
              showToast('You successfully changed your email')
              loginReset()
            })
            .catch(err => {
              setIsLoading(false)
              showErrorAlert(I18n.t('Updating_security_failed'))
              console.log('error', err)
            })
        })
        .catch(() => {
          setIsLoading(false)
          showErrorAlert(I18n.t('error-invalid-password'))
        })
    }
  }

  return (
    <ModalView isShow={isShow} onClose={onClose} title={'Email Setting'} theme={theme}>
      <FloatingTextInput
        inputRef={emailInput}
        keyboardType="email-address"
        textContentType="oneTimeCode"
        value={email}
        label={I18n.t('Email')}
        placeholder={'Enter your email'}
        onChangeText={email => setEmail(email)}
        theme={theme}
        error={errEmail}
      />

      <Button
        style={styles.submitBtn}
        title={'SAVE'}
        size="W"
        onPress={onSubmit}
        loading={isLoading}
        theme={theme}
      />
    </ModalView>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
  loginReset: params => dispatch(loginResetAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(UpdateEmailModal))
