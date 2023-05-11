import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  SafeAreaView,
  Pressable, TextInput,
} from 'react-native'
import { connect } from 'react-redux'

import { COLOR_YELLOW, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import styles from './styles'
import images from '../../assets/images'
import SidebarItem from './SidebarItem'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { logout as logoutAction } from '../../actions/login'
import { showConfirmationAlert } from '../../lib/info'
import { GradientHeader } from '../../containers/GradientHeader'
import I18n from '../../i18n'
import { SITE_SHOP_URL, SITE_VIP_MEMBERS_URL, SUPPORT_EMAIL } from '../../constants/app'
import { VectorIcon } from '../../containers/VectorIcon'
import OptionCardBtn from '../../containers/OptionCardBtn'
import InviteModal from './InviteModal'

const SidebarView = (props) => {
  const { user, theme, navigation } = props
  const [isShowInvite, onShowInviteModal] = useState(false)
  const menus = [
    {
      id: 'shop',
      name: I18n.t('Shop'),
      icon: 'shopping',
    },
    {
      id: 'vip_members',
      name: I18n.t('Vip_members'),
      icon: 'star-circle',
    },
    {
      id: 'connections',
      name: 'My connections',
      icon: 'account-multiple',
    },
    {
      id: 'privacy_and_settings',
      name: I18n.t('Privacy_and_settings'),
      icon: 'shield-lock',
    },
    {
      id: 'help_and_support',
      name: I18n.t('Help_and_support'),
      icon: 'comment-question',
    },
  ]

  useEffect(() => {
    navigation.setOptions({
      title: 'VIP Billionaires',
      headerBackground: () => <GradientHeader />,
    })
  }, [])

  const onClick = item => {
    switch (item.id) {
      case 'privacy_and_settings':
        return navigation.navigate('MenuStack', { screen: 'PrivacyAndSettings' })
      case 'shop':
        return Linking.openURL(SITE_SHOP_URL)
      case 'help_and_support':
        return Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=&body=`)
      case 'connections':
        return navigation.navigate('MenuStack', { screen: 'MyConnections' })
      case 'vip_members':
        return Linking.openURL(SITE_VIP_MEMBERS_URL)
      default:
        navigation.navigate('')
    }
  }
  const onLogOut = () => {
    const { logout } = props
    showConfirmationAlert({
      title: I18n.t('Logout'),
      message: I18n.t('are_you_sure_to_log_out'),
      callToAction: I18n.t('Confirm'),
      onPress: () => {
        if (global.unSubscribeRoom) {
          global.unSubscribeRoom()
          global.unSubscribeRoom = undefined
        }
        logout()
      },
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themes[theme].backgroundColor,
        paddingHorizontal: 16,
      }}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <View style={styles.profileInnerContainer}>
          <Image
            source={user.avatar ? { uri: user.avatar } : images.default_avatar}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 12 }}>
            <Text
              style={[
                styles.profileName,
                { color: themes[theme].titleColor },
              ]}>
              {user.displayName}
            </Text>
            <Text style={[styles.profileName, { color: themes[theme].textColor, fontSize: 12 }]}>
              {user.handle}
            </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
              <Text style={[styles.roleName, { color: COLOR_YELLOW }]}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Pressable onPress={() => navigation.closeDrawer()} style={styles.closeIconAndText}>
          <VectorIcon
            type="AntDesign"
            name="close"
            size={11}
            color={themes[theme].textColor}
            style={styles.closeIcon}
          />
          <Text style={[{ color: themes[theme].textColor }]}>Clear</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: themes[theme].backgroundColor,
          paddingHorizontal: 16,
        }}
        {...scrollPersistTaps}>
        <OptionCardBtn
          subTextColor={{ color: COLOR_YELLOW }}
          image={images.reward_badge}
          title="Premium Subscription"
          smallText="Upgrade plan"
          onPress={() => {}}
        />
        <OptionCardBtn
          image={images.fast_email_sending}
          title="Invite to engage more people"
          smallText="Invite now"
          rightIcon
          rightIconName="share"
          onPress={() => {onShowInviteModal(true)}}
        />
        <Text style={[styles.menuText, { color: themes[theme].titleColor }]}>Menu</Text>
        {menus.map(m => (
          <SidebarItem
            key={m.id}
            id={`sidebar-view-key-${m.id}`}
            text={m.name}
            left={
              <VectorIcon
                name={m.icon}
                type={'MaterialCommunityIcons'}
                size={20}
                style={{ color: themes[theme].textColor }}
              />
            }
            hasRight
            containerStyle={styles.menu}
            onPress={() => onClick(m)}
            theme={theme}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={onLogOut}
        style={[styles.logoutBtn, { backgroundColor: themes[theme].buttonBackground }]}>
        <VectorIcon
          name={'logout-variant'}
          type={'MaterialCommunityIcons'}
          size={24}
          style={{ color: themes[theme].textColor }}
        />
        <Text
          style={[styles.logoutText, { color: themes[theme].activeTintColor }]}>
          {I18n.t('Logout').toUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.bottomView}>
        <View style={styles.privacyTermsEulaContainer}>
          <Text style={[styles.text, { color: themes[theme].textColor }]}
                onPress={() => {navigation.navigate('AboutStack', { screen: 'PrivacyPolicy' })}}
          >
            Privacy policy
          </Text>
          <Text style={[{ color: themes[theme].titleColor }]}>|</Text>
          <Text style={[styles.text, { color: themes[theme].textColor }]}
                onPress={() => {navigation.navigate('AboutStack', { screen: 'TermsOfServices' })}}>
            Terms of services
          </Text>
          <Text style={[{ color: themes[theme].titleColor }]}>|</Text>
          <Text style={[styles.text, { color: themes[theme].textColor }]}
                onPress={() => {navigation.navigate('AboutStack', { screen: 'Eula' })}}>
            Eula
          </Text>
        </View>
        <View style={styles.languageContainer}>
          <Image source={images.en_language} />
          <Text style={[styles.languageText, { color: themes[theme].textColor }]}>English (US)</Text>
        </View>
      </View>

      <InviteModal
        isShow={isShowInvite} theme={theme}
        onClose={() => onShowInviteModal(false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SidebarView))
