import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import styles from './styles'
import FloatingTextInput from '../../containers/FloatingTextInput'
import Button from '../../containers/Button'
import I18n from '../../i18n'
import ModalView from '../../containers/ModalView'
import { showErrorAlert, showToast } from '../../lib/info'
import firebaseSdk from '../../lib/firebaseSdk'

const UpdatePasswordModal = ({ isShow, onClose, theme, user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({ old: '', new: '', confirm: '' })
  const [errOld, setErrOld] = useState('')
  const [errNew, setErrNew] = useState('')
  const [errConfirm, setErrConfirm] = useState('')
  const [isBtnDisable, setBtnDisable] = useState(false)

  const oldPasswordInput = useRef(null)
  const passwordInput = useRef(null)
  const confirmPasswordInput = useRef(null)

  const isValid = () => {
    setErrOld('')
    setErrNew('')
    setErrConfirm('')
    if (!state.old.length) {
      setErrOld(I18n.t('please_enter_old_password'))
      oldPasswordInput.current.focus()
      return false
    } else if (!state.new.length) {
      setErrNew('Please enter your new password.')
      passwordInput.current.focus()
      return false
    } else if (!state.confirm.length) {
      setErrConfirm('Please enter your confirm password.')
      confirmPasswordInput.current.focus()
      return false
    } else if (state.confirm !== state.new) {
      setErrConfirm('The confirmation password doesn\'t match the new password.')
      confirmPasswordInput.current.focus()
      return false
    } else {
      return true
    }
  }

  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true)
      firebaseSdk.reauthenticate(user.email, state.old).then(() => {
        firebaseSdk.updateCredential(user.email, state.new).then(async () => {
          setIsLoading(false)
          showToast('You successfully changed your password')
          onClose()
        }).catch(err => {
          setIsLoading(false)
          showErrorAlert(I18n.t('Updating_security_failed'))
          console.log('error', err)
        })
      }).catch(() => {
        setIsLoading(false)
        showErrorAlert(I18n.t('error-invalid-email_or_password'))
      })
    }
  }

  return (
    <ModalView isShow={isShow} onClose={onClose} title={'Password Setting'} theme={theme}>
      <FloatingTextInput
        inputRef={e => {
          oldPasswordInput.current = e
        }}
        label={I18n.t('Old_password')}
        secureTextEntry
        textContentType="oneTimeCode"
        onChangeText={pwd => setState({ ...state, old: pwd })}
        onSubmitEditing={() => {
          passwordInput.current.focus()
        }}
        theme={theme}
        error={errOld}
      />
      <FloatingTextInput
        inputRef={e => {
          passwordInput.current = e
        }}
        label={I18n.t('New_Password')}
        secureTextEntry
        textContentType="oneTimeCode"
        onChangeText={pwd => setState({ ...state, new: pwd })}
        onSubmitEditing={() => {
          confirmPasswordInput.current.focus()
        }}
        theme={theme}
        error={errNew}
      />
      <FloatingTextInput
        inputRef={e => {
          confirmPasswordInput.current = e
        }}
        label={'Confirm Password'}
        secureTextEntry
        textContentType="oneTimeCode"
        onChangeText={pwd => setState({ ...state, confirm: pwd })}
        theme={theme}
        error={errConfirm}
      />
      <Button
        style={styles.submitBtn}
        title={'SAVE'}
        size="W"
        disabled={isBtnDisable}
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

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(UpdatePasswordModal))
