import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { themes } from '../../constants/colors'
import { withTheme } from '../../theme'
import { setUser as setUserAction } from '../../actions/login'
import sharedStyles from '../Styles'
import I18n from '../../i18n'
import UsersList from '../../containers/UsersList'
import { FOLLOWING_USERS } from '../../constants/app'
import { VectorIcon } from '../../containers/VectorIcon'

const FollowView = ({ theme, user, route }) => {
  const navigation = useNavigation()
  const type = route.params ? route.params.type : null
  const account = route.params ? route.params.account : null
  const isSelf = account.id === user.id
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={sharedStyles.header} onPress={() => navigation.goBack()}>
          <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      title: type === FOLLOWING_USERS ? I18n.t('Followings') : I18n.t('Followers'),
      headerRight: () => <></>,
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  return (
    <View style={[sharedStyles.container, { paddingHorizontal: 16 }]}>
      <UsersList type={type} isSelf={isSelf} account={account} theme={theme} />
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FollowView))
