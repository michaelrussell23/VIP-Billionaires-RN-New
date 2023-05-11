import React, { useRef, useState, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import KeyboardView from '../../containers/KeyboardView'
import sharedStyles from '../Styles'
import StatusBar from '../../containers/StatusBar'
import styles from './styles'
import { showToast } from '../../lib/info'
import firebaseSdk, { DB_ACTION_UPDATE } from '../../lib/firebaseSdk'
import { setUser as setUserAction } from '../../actions/login'
import ActivityIndicator from '../../containers/ActivityIndicator'
import I18n from '../../i18n'
import { VectorIcon } from '../../containers/VectorIcon'
import ExDatePicker from '../../containers/ExDatePicker'
import FloatingTextInput from '../../containers/FloatingTextInput'
import { themes } from '../../constants/colors'
import { dateToString, DATE_STRING_FORMAT } from '../../utils/datetime'
import { useNavigation } from '@react-navigation/native'
import i18n from '../../i18n'
import CsSelectGender from '../../containers/CsSelectGender'
import Button from '../../containers/Button'

const ProfileEditView = props => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    image_path: null,
    displayName: props.user.displayName,
    email: props.user.email,
    phone: props.user.phone ?? '',
    gender: props.user.gender ?? '',
    birthday: props.user.birthday
      ? typeof props.user.birthday === 'string'
        ? props.user.birthday
        : typeof props.user.birthday === 'object' && props.user.birthday.seconds
          ? dateToString(props.user.birthday, DATE_STRING_FORMAT)
          : null
      : null,
    bio: props.user.bio ?? '',
    city: props.user.city ?? '',
    website: props.user.website ?? '',
    isLoading: false,
    topScrollEnable: true,
  })
  const nameInput = useRef(null)
  const cityInput = useRef(null)
  const bioInput = useRef(null)
  const websiteInput = useRef(null)
  const phoneInput = useRef(null)

  const { theme } = props
  const { displayName, bio, phone, gender, birthday, city, website, isLoading } = state

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={sharedStyles.header} onPress={() => navigation.goBack()}>
          <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      title: 'Update Basic Information',
      headerRight: () => (<></>),
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  const isValid = () => {
    const { displayName, email, website } = state
    if (!displayName.length) {
      showToast(I18n.t('please_enter_name'))
      nameInput.current.focus()
      return false
    }
    if (!city.length) {
      showToast(I18n.t('please_enter_city'))
      cityInput.current.focus()
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (isValid()) {
      setState({ ...state, isLoading: true })
      const { user, navigation, setUser } = props
      const { displayName, phone, email, gender, birthday, bio, city, website } = state

      let userInfo = {
        id: user.id,
        displayName: displayName,
        phone: phone,
        email: email,
        gender: gender,
        birthday: birthday,
        bio: bio,
        city: city,
        website: website,
      }

      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
        .then(() => {
          showToast(I18n.t('Update_profile_complete'))
          setState({ ...state, isLoading: false })
          const updateUser = { ...user, ...userInfo }
          setUser(updateUser)
          navigation.pop()
        })
        .catch(err => {
          showToast(I18n.t(err.message))
          setState({ ...state, isLoading: false })
        })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardView contentContainerStyle={sharedStyles.container}>
        <StatusBar />

        {isLoading && <ActivityIndicator absolute theme={theme} size={'large'} />}
        <View style={styles.inputContainer}>
          <FloatingTextInput
            inputRef={nameInput}
            value={displayName}
            returnKeyType="next"
            keyboardType="default"
            textContentType="oneTimeCode"
            label={I18n.t('Name')}
            placeholder={'Enter Your name'}
            onChangeText={name => setState({ ...state, displayName: name })}
            theme={theme}
            onSubmitEditing={() => {
              bioInput.current.focus()
            }}
            autoCapitalize="none"
          />
          <FloatingTextInput
            inputRef={bioInput}
            value={bio}
            returnKeyType="next"
            keyboardType="default"
            textContentType="oneTimeCode"
            label={I18n.t('Bio')}
            onChangeText={bio => setState({ ...state, bio: bio })}
            theme={theme}
            multiline
          />
          <CsSelectGender
            label="Select Your Gender"
            theme={theme}
            onChange={gender => setState({ ...state, gender: gender })}
            value={gender}
            itemStyle={{ borderColor: themes[theme].borderColor, marginBottom: 8 }}
          />
          <FloatingTextInput
            inputRef={cityInput}
            value={city}
            returnKeyType="next"
            keyboardType="default"
            textContentType="oneTimeCode"
            label={I18n.t('City')}
            placeholder={'Select City'}
            onChangeText={city => setState({ ...state, city: city })}
            theme={theme}
            onSubmitEditing={() => {
              bioInput.current.focus()
            }}
          />
          <FloatingTextInput
            inputRef={phoneInput}
            value={phone}
            returnKeyType="next"
            keyboardType="phone-pad"
            textContentType="oneTimeCode"
            label={'Phone Number'}
            onChangeText={phone => setState({ ...state, phone })}
            theme={theme}
            onSubmitEditing={() => {
              websiteInput.current.focus()
            }}
          />
          <FloatingTextInput
            inputRef={websiteInput}
            value={website}
            returnKeyType="next"
            keyboardType="default"
            textContentType="oneTimeCode"
            label={'Url'}
            onChangeText={website => setState({ ...state, website })}
            theme={theme}
            placeholder={'https://google.com'}
            autoCapitalize="none"
          />
          <ExDatePicker
            theme={theme}
            placeholder={'Select Date of birth'}
            value={birthday}
            action={({ value }) => {
              if (!value) { return }
              setState({ ...state, birthday: value })
            }}
            label="Date of birth"
            containerStyle={{ borderColor: themes[theme].borderColor }}
          />
        </View>
      </KeyboardView>
      <View style={{ height: 80, marginHorizontal: 16 }}>
        <Button
          style={styles.submitBtn}
          title={i18n.t('update')}
          size="W"
          onPress={onSubmit}
          theme={theme}
          pressingHighlight
        />
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ProfileEditView))
