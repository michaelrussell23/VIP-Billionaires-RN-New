import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import { setUser as setUserAction } from '../../actions/login'
import sharedStyles from '../Styles'
import I18n from '../../i18n'
import { VectorIcon } from '../../containers/VectorIcon'
import UsersList from '../../containers/UsersList'
import { ALL_USERS } from '../../constants/app'

const FindFriendView = props => {
  const navigation = useNavigation()

  const { theme } = props

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={sharedStyles.header} onPress={() => navigation.goBack()}>
          <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      title: I18n.t('find_friend'),
      headerRight: () => <></>,
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  return (
    <View style={[sharedStyles.container, { paddingHorizontal: 16 }]}>
      <StatusBar />
      <UsersList type={ALL_USERS} isSelf={true} theme={theme} />
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FindFriendView))
