import React, { useEffect, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView, Image, FlatList, RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
import { themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import { VectorIcon } from '../../containers/VectorIcon'
import styles from './styles'
import ActivityIndicator from '../../containers/ActivityIndicator'
import firestore from '@react-native-firebase/firestore'
import firebaseSdk, { DB_ACTION_UPDATE } from '../../lib/firebaseSdk'
import images from '../../assets/images'
import I18n from '../../i18n'
import { setUser as setUserAction } from '../../actions/login'

const BlockView = (props) => {
  const { user, theme, navigation } = props
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      title: null,
      headerRight: () => (<></>),
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  useEffect(() => {
    init()
  }, [user])

  const init = async () => {
    const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get()

    const block_list = []
    userSnaps.forEach(s => {
      const userInfo = { ...s.data(), id: s.id }
      if (userInfo.userId !== user.userId) {
        if (user.blocked && user.blocked.includes(userInfo.userId)) {
          block_list.push(userInfo)
        }
      }
    })
    setData(block_list)
    setLoading(false)
    setUpdating(false)
    setRefreshing(false)
  }

  const unBlock = (item) => {
    const { user, setUser } = props

    if (!user.blocked) {
      return
    }

    let blocked = user.blocked.filter(b => b !== item.userId)
    setUpdating(true)
    firebaseSdk.setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, { id: user.id, blocked })
      .then(async () => {
        setUser({ ...user, blocked: blocked }, () => {
          init()
        })
      })
      .catch(() => {
        setUpdating(false)
      })
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Image
            source={item.avatar ? { uri: item.avatar } : images.default_avatar}
            style={styles.itemImage}
          />
          <View style={styles.itemContent}>
            <Text style={[styles.itemText, { color: themes[theme].activeTintColor }]}>
              {item.displayName}
            </Text>
            <Text style={[styles.itemPost, { color: themes[theme].textColor }]}>
              {`0 ${I18n.t('Posts').toLowerCase()}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => unBlock(item)}>
          <Text style={[styles.blockText, { color: themes[theme].textColor }]}>
            Unblock
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />
    }
    return null
  }

  const onRefresh = () => {
    setRefreshing(true)
    init()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
      <StatusBar />
      {updating && (
        <ActivityIndicator absolute theme={theme} size={'large'} />
      )}
      <View style={{ flexDirection: 'column', marginBottom: 8, padding: 16 }}>
        <Text style={[styles.title, { color: themes[theme].titleColor }]}>Blocked Users</Text>
      </View>
      <View style={styles.container}>
        {data.length > 0 && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.userId}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={themes[theme].activeTintColor}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BlockView))
