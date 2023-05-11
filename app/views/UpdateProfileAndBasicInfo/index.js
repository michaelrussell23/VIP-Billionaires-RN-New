import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import styles from './style'
import images from '../../assets/images'
import { COLOR_BLACK, COLOR_LIGHT_DARK, COLOR_WHITE, COLOR_YELLOW, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import i18n from '../../i18n'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { VectorIcon } from '../../containers/VectorIcon'
import Button from '../../containers/Button'
import ProfileImageUpload from './ProfileImageUpload'
import BasicInfoUpdate from './BasicInfoUpdate'
import AddExperienceButton from './AddExperienceButton'
import firebaseSdk from '../../lib/firebaseSdk'

import { showToast } from '../../lib/info'
import { loginSuccess as loginSuccessAction } from '../../actions/login'
import { appStart as appStartAction } from '../../actions/app'
import { connect } from 'react-redux'

const theme = 'light'

const UpdateProfileAndBasicInfo = ({ loginSuccess, user, dispatch }) => {
  const [radioButtonChecked, setRadioButtonChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [profileImage, setProfileImage] = useState({
    imageName: '',
    imageUrl: '',
  })

  const [userInfo, setUserInfo] = useState({
    displayName: '',
    gender: 'male',
    city: '',
    phone: '',
    birthday: '',
    job: '',
    company: '',
    role: '',
    years_of_service: '',
  })

  const onUserInfoUpdated = update => {
    setUserInfo(info => {
      return { ...info, ...update }
    })
  }

  const onSubmit = () => {
    if (!profileImage.imageUrl || userInfo.displayName || userInfo.job) {
      showToast(i18n.t('please_complete_these_steps_to_confirm'))
      return
    }

    if (!radioButtonChecked) {
      showToast(i18n.t('you_should_agree_with_terms'))
      return
    }

    setIsLoading(true)
    const user_ = { ...user, ...userInfo, avatar: profileImage.imageUrl }
    firebaseSdk
      .updateUser(user_)
      .then(async () => {
        showToast(i18n.t('Register_complete'))
        loginSuccess({ ...user_, emailVerified: true })
      })
      .catch(err => {
        showErrorAlert(i18n.t('Register_fail'))
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: COLOR_WHITE }}>
      <StatusBar />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLOR_WHITE, height: '100%', paddingHorizontal: 24 }}
        {...scrollPersistTaps}
        keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={images.logo} />
          <Text style={[styles.welcomeText, { color: themes[theme].headerTitleColor }]}>
            {i18n.t('Onboard_text_welcome')}
          </Text>
          <Text style={styles.completeStepsText}>{i18n.t('please_complete_these_steps_to_confirm')}</Text>
        </View>

        <ProfileImageUpload {...profileImage} onUpload={setProfileImage} />

        <BasicInfoUpdate userInfo={userInfo} onUpdate={onUserInfoUpdated} />

        <Text style={styles.updateExperienceText}>{i18n.t('update_experience')}</Text>

        <AddExperienceButton userInfo={userInfo} onUpdate={onUserInfoUpdated} />

        {/* Other container */}
        <View style={styles.othersContainer}>
          <Text style={styles.othersText}>Others</Text>
          <TouchableOpacity style={styles.basicSubscriptionBtn}>
            <Image source={images.reward_badge} style={styles.reward_badge} />
            <View style={styles.basicSubscriptionAndUpgradePlanContainer}>
              <Text style={styles.basicSubscriptionText}>Basic Supscription</Text>
              <Text style={styles.upgradePlanText}>upgrade plan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inviteNowBtn}>
            <Image source={images.fast_email_sending} style={styles.fast_email_sending} />
            <View style={styles.basicSubscriptionAndUpgradePlanContainer}>
              <Text style={styles.inviteTitle}>Invite to engage more people</Text>
              <Text style={styles.inviteDescription}>Invite now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom sheet/terms and conditions */}
      <View style={styles.bottomSheet}>
        <View style={styles.radioButtonAndText}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name={radioButtonChecked ? 'radiobox-marked' : 'radiobox-blank'}
            size={18}
            color={radioButtonChecked ? '#DBAA2E' : COLOR_LIGHT_DARK}
            style={styles.radioButton}
            onPress={() => setRadioButtonChecked(b => !b)}
          />
          <Text style={styles.termsAndConditionsPrivacyPolicy}>
            I agree with the <Text style={styles.termsAndConditions}>Terms and Conditions</Text> and{' '}
            <Text style={styles.privacyPolicy}>Privacy Policy.</Text>
          </Text>
        </View>
        <Button
          title="Confirm & Create an Account"
          theme={theme}
          size="W"
          fontSize={14}
          textColor={COLOR_BLACK}
          backgroundColor={COLOR_YELLOW}
          style={styles.confirmBtn}
          onPress={onSubmit}
          testID="confirn_create_account"
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(UpdateProfileAndBasicInfo))
