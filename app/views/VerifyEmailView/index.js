import React from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import styles from './styles'
import images from '../../assets/images'
import sharedStyles from '../../views/Styles'
import { COLOR_YELLOW, themes } from '../../constants/colors'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { loginSuccess as loginSuccessAction } from '../../actions/login'

const theme = 'light'

const VerifyEmailView = props => {
  return (
    <ImageBackground style={[styles.container, { backgroundColor: themes[theme].backgroundColor }]} source={images.intro_background}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={{ flexGrow: 0.9, justifyContent: 'center' }}
          {...scrollPersistTaps}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image style={styles.logo} source={images.email_verified} />
            <Text style={styles.mainText}>
              Verify your email address
            </Text>
            <Text style={[styles.subText, { color: themes[theme].textColor }]}>
              Thank you for your registration, before we move forward please verify your email address
            </Text>
            <Text style={[styles.subText, { color: themes[theme].textColor, marginTop: 28 }]}>
              <Text>View your email inbox &nbsp;</Text>
              <Text
                style={[{ ...sharedStyles.link, color: COLOR_YELLOW }, {
                  fontFamily: 'Raleway',
                  fontSize: 14,
                  textDecorationLine: 'none',
                }]}>
                Email Inbox
              </Text>
            </Text>
            <Text style={[styles.subDescriptionText,
            { color: themes[theme].textColor, marginTop: 28, lineHeight: 25 },
            ]}>
              {'ご登録ありがとうございます。 次に進む前にメールアドレスの確認を お願いいたします。'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(VerifyEmailView))
