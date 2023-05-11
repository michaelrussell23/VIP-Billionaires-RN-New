import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import styles from './styles'
import FloatingTextInput from '../../containers/FloatingTextInput'
import Button from '../../containers/Button'
import I18n from '../../i18n'
import firebaseSdk, { DB_ACTION_UPDATE } from '../../lib/firebaseSdk'
import { showErrorAlert, showToast } from '../../lib/info'
import { setUser as setUserAction } from '../../actions/login'
import ModalView from '../../containers/ModalView'

const AccountSettingsModal = ({ isShow, onClose, theme, user, setUser }) => {
  const [userInfo, setUserInfo] = useState({ name: user && user.displayName || '', username: user && user.handle || '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errName, setErrName] = useState('')
  const [errUserName, setErrUserName] = useState('')
  const nameInput = useRef(null)
  const usernameInput = useRef(null)

  useEffect(() => {
    setUserInfo({ name: user && user.displayName || '', username: user && user.handle || '' })
    if (isShow) {
      isValid()
    }
  }, [isShow, user])

  const isValid = () => {
    setErrName('')
    setErrUserName('')
    if (!userInfo.name.length) {
      setErrName(I18n.t('please_enter_name'))
      nameInput.current.focus()
      return false
    } else if (!userInfo.username.length) {
      setErrUserName(I18n.t('please_enter_name'))
      usernameInput.current.focus()
      return false
    } else {
      return true
    }
  }

  const onChangeText = (text, type) => {
    if (type === 'name') {
      setUserInfo({ ...userInfo, name: text })
    } else {
      setUserInfo({ ...userInfo, username: text })
    }
  }

  const onSubmit = () => {
    if (isValid()) {
      const update = { id: user.id, displayName: userInfo.name, handle: userInfo.username }
      setIsLoading(true)
      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, update)
        .then(() => {
          setUser({ ...user, ...update })
          setIsLoading(false)
          onClose()
          showToast('Account name and username has been successfully updated.')
        })
        .catch(() => {
          showErrorAlert('Updating was failed', I18n.t('Oops'))
          setIsLoading(false)
        })
    }
  }

  return (
    <ModalView isShow={isShow} onClose={onClose} title={'Account Setting'} theme={theme}>
      <FloatingTextInput
        inputRef={nameInput}
        returnKeyType="next"
        value={userInfo.name}
        label={'Name'}
        placeholder={'Enter Your Name'}
        onChangeText={text => onChangeText(text, 'name')}
        theme={theme}
        onSubmitEditing={() => {
          usernameInput.current.focus()
        }}
        error={errName}
      />
      <FloatingTextInput
        inputRef={usernameInput}
        label={'username'}
        value={userInfo.username}
        placeholder={'Enter Your Username'}
        onChangeText={text => onChangeText(text, 'username')}
        theme={theme}
        error={errUserName}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AccountSettingsModal))
