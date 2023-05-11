import React, { useState, useEffect } from 'react'
import { COLOR_BTN_BACKGROUND, COLOR_TRANSPARENT, COLOR_WHITE, COLOR_YELLOW, HEADER_BAR_END, HEADER_BAR_START, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import {
  Image,
  SafeAreaView,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Share, FlatList, useWindowDimensions, Dimensions,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { chunk } from 'lodash'

import images from '../../assets/images'
import styles from './styles'
import { setUser as setUserAction } from '../../actions/login'
import ActivityIndicator from '../../containers/ActivityIndicator'
import { isValidURL } from '../../utils/validators'
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  DB_ACTION_UPDATE,
  NOTIFICATION_TYPE_FOLLOW,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk'
import { showErrorAlert, showToast } from '../../lib/info'
import { withActionSheet } from '../../containers/ActionSheet'
import { VectorIcon } from '../../containers/VectorIcon'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import I18n from '../../i18n'
import PostText from '../ProfileView/PostText'
import {
  FOLLOWER_USERS,
  FOLLOWING_USERS,
  POST_TYPE_PHOTO,
  POST_TYPE_TEXT,
  POST_TYPE_VIDEO,
} from '../../constants/app'
import PopupMenu from '../../containers/PopupMenu'
import { onSharePost } from '../../utils/const'
import sharedStyles from '../Styles'
import { SceneMap, TabView } from 'react-native-tab-view'
import MediaView from '../../containers/MediaView'
import Post from '../../containers/Post/Post'

const { width } = Dimensions.get('screen')
const OtherProfileView = props => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Post' },
    { key: 'second', title: 'Media' },
  ])
  const { navigation, user, theme } = props
  const userId = props.route.params?.userId
  const [state, setState] = useState({
    account: {
      userId: userId,
    },
    posts: [],
    isLoading: true,
    updating: false,
    refreshing: false,
  })

  const { account, posts, isLoading } = state
  let unSubscribePost = ''

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={sharedStyles.header} onPress={() => navigation.goBack()}>
          <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>),
      title: '',
      headerRight: () => (
        <View style={sharedStyles.header}>
          <TouchableOpacity style={{ paddingHorizontal: 0 }} onPress={() => navigation.navigate('FindFriend')}>
            <VectorIcon type="MaterialCommunityIcons" name="magnify" color={themes[theme].titleColor} size={24} />
          </TouchableOpacity>
          <PopupMenu
            theme={theme}
            options={onActionPost().options}
            renderTrigger={() => (
              <VectorIcon type="MaterialCommunityIcons" name="dots-horizontal" color={themes[theme].titleColor} size={24} />
            )}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  useEffect(() => {
    init()
  }, [])

  const setSafeState = states => {
    setState({ ...state, ...states })
  }

  const init = () => {
    const { navigation } = props
    firebaseSdk
      .getUser(state.account.userId)
      .then(user => {
        const userPostSubscribe = firestore()
          .collection(firebaseSdk.TBL_POST)
          .where('userId', '==', state.account.userId)
        unSubscribePost = userPostSubscribe.onSnapshot(querySnap => {
          let posts = []
          if (querySnap) {
            querySnap.forEach(doc => {
              posts.push({ id: doc.id, ...doc.data(), owner: user })
            })
            posts.sort((a, b) => b.date - a.date)
            setSafeState({ account: user, isLoading: false, posts })
          }
        })
      })
      .catch(() => {
        setSafeState({ isLoading: false })
        showErrorAlert(I18n.t('user_not_found'), '', () => navigation.pop())
      })
  }

  const openLink = url => {
    if (url && url.length > 0 && isValidURL(url)) {
      Linking.openURL(url)
    }
  }

  const onToggleFollow = following => {
    const { user, setUser } = props
    const { account } = state

    setState({ ...state, loading: true })
    firebaseSdk
      .updateFollows(
        user.id,
        account.id,
        following ? DB_ACTION_DELETE : DB_ACTION_ADD,
      )
      .then(({ myFollowings, userFollowers }) => {
        if (!following) {
          const activity = {
            type: NOTIFICATION_TYPE_FOLLOW,
            sender: user.userId,
            receiver: account.userId,
            content: '',
            postId: null,
            title: account.displayName,
            message: `${user.displayName} ${I18n.t('follow_you')}.`,
            date: new Date(),
          }
          firebaseSdk.addActivity(activity, account.token).then(r => {
            console.log(r)
          })
        }
        setUser({ followings: myFollowings })
        const newAccount = { ...account, followers: userFollowers }
        setState({ ...state, loading: false, account: newAccount })
      })
      .catch(() => {
        setState({ ...state, loading: false })
      })
  }

  const sendMessage = async () => {
    const { user, navigation } = props
    const { account } = state
    const roomSnaps = await firestore().collection(firebaseSdk.TBL_ROOM).get()
    let room = null
    roomSnaps.forEach(doc => {
      const roomInfo = doc.data()
      if (
        (user.userId === roomInfo.sender &&
          account.userId === roomInfo.receiver) ||
        (user.userId === roomInfo.receiver &&
          account.userId === roomInfo.sender)
      ) {
        room = { id: doc.id, ...roomInfo, account }
      }
    })

    if (!room) {
      room = {
        sender: user.userId,
        receiver: account.userId,
        date: new Date(),
        lastMessage: '',
        confirmUser: '',
        unReads: 0,
      }
      const roomDocRef = await firestore()
        .collection(firebaseSdk.TBL_ROOM)
        .add(room)
      const roomDoc = await roomDocRef.get()
      return navigation.navigate('Chat', {
        room: { id: roomDoc.id, ...roomDoc.data(), account },
      })
    }
    navigation.navigate('Chat', { room })
  }

  const onOpenPost = item => {
    props.navigation.push('PostDetail', { post: item })
  }

  const onToggleLike = (item, isLiking) => {
    const { user } = props

    let update = {}
    if (isLiking) {
      update = { id: item.id, likes: item.likes.filter(l => l !== user.userId) }
    } else {
      update = { id: item.id, likes: [...item.likes, user.userId] }
    }

    setState({ ...state, isLoading: true })
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
      .then(() => {
        if (!isLiking && item.owner.userId !== user.userId) {
          const postImage =
            item.type === 'video'
              ? item.thumbnail
              : item.type === 'photo'
                ? item.photo
                : ''
          const activity = {
            type: NOTIFICATION_TYPE_LIKE,
            sender: user.userId,
            receiver: item.owner.userId,
            content: '',
            text: item.text,
            postId: item.id,
            postImage,
            postType: item.type,
            title: item.owner.displayName,
            message: `${user.displayName} likes your post.`,
            date: new Date(),
          }
          firebaseSdk.addActivity(activity, item.owner.token).then(r => {})
        }
      })
      .catch(() => {
        setState({ ...state, isLoading: false })
      })
  }

  const onActionPost = item => {
    const onReport = () => {
      const { user } = props
      const { account } = state
      const report = {
        userId: user.userId,
        postId: item ? item.id : null,
        ownerId: account.userId,
        createdAt: new Date(),
      }

      setState({ ...state, isLoading: true })
      firebaseSdk
        .setData(firebaseSdk.TBL_REPORTS, DB_ACTION_ADD, report)
        .then(() => {
          showToast(
            item
              ? I18n.t('Report_post_complete')
              : I18n.t('Report_user_complete'),
          )
          setState({ ...state, isLoading: false })
        })
        .catch(err => {
          showErrorAlert(
            item ? I18n.t('Report_post_failed') : I18n.t('Report_user_failed'),
            I18n.t('Oops'),
          )
          setState({ ...state, isLoading: false })
        })
    }

    const onBlock = () => {
      const { account } = state
      const { user, setUser } = props
      let blocked = user.blocked ?? []
      let update = { id: user.id, blocked: [...blocked, account.userId] }

      setState({ ...state, isLoading: true })
      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, update)
        .then(() => {
          setUser({ blocked: update.blocked })
          showToast(I18n.t('Block_user_complete'))
          setState({ ...state, isLoading: false })
          props.navigation.pop()
        })
        .catch(err => {
          showErrorAlert(I18n.t('Block_user_failed'), I18n.t('Oops'))
          setState({ ...state, isLoading: false })
        })
    }

    const options = [
      {
        title: I18n.t('Report_post'),
        onPress: onReport,
      },
      {
        title: I18n.t('Block_user'),
        // danger: true,
        onPress: onBlock,
      },
    ]
    return { options }
  }

  const renderScene = SceneMap({
    first: (() => <RenderPostItem posts={posts.filter(p => p.type === POST_TYPE_TEXT || p.type === POST_TYPE_PHOTO)} />),
    second: (() => <MediaView posts={posts.filter(p => p.type === POST_TYPE_PHOTO || p.type === POST_TYPE_VIDEO)} onOpenPost={onOpenPost} theme={theme} />),
  })

  const RenderPostItem = ({ posts }) => (
    <FlatList
      style={{ width }}
      data={posts}
      renderItem={({ item, index }) => (
        <Post
          item={item}
          onPress={() => onOpenPost(item)}
          onPressUser={() => {}}
          onPressShare={() => onSharePost(item)}
          onLike={isLiking => onToggleLike(item, isLiking)}
          isLiking={item.likes && item.likes.includes(user.userId)}
          onActions={onActionPost(item)}
          theme={theme}
          style={{ marginTop: index === 0 ? 0 : 8 }}
        />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `profile_${item.id}`}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  )

  const renderTabBar = (props) => {
    return (
      <View style={[styles.tabBar, { backgroundColor: themes[theme].buttonBackground }]}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[styles.tabItem, index === i ? styles.activeTab : '', {
                backgroundColor: index === i ? COLOR_BTN_BACKGROUND : COLOR_TRANSPARENT,
              }]}
              onPress={() => setIndex(i)}>
              <Text style={[styles.tabText, {
                color: index === i ? COLOR_WHITE : themes[theme].textColor,
              }]}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const following = user && user.followings.includes(account.userId)

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { borderColor: themes[theme].borderColor }]}>
            <Image source={account.avatar ? { uri: account.avatar } : images.default_avatar} style={styles.avatar} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileTitle, { color: themes[theme].titleColor }]}>
              {account.displayName}
            </Text>
            {account.handle && account.handle.length > 0 ? (
              <Text style={[styles.profileText, { color: themes[theme].textColor }]}>{account.handle}</Text>
            ) : null}
            {account.bio && account.bio.length > 0 ? (
              <Text style={[styles.profileText, { color: themes[theme].textColor }]}>{account.bio}</Text>
            ) : null}
            {account.website && account.website.length > 0 ? (
              <TouchableOpacity onPress={() => openLink(account.website)}>
                <Text style={[styles.profileText, { color: COLOR_YELLOW }]}>{account.website}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View style={styles.details}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.detailsTitle, { color: themes[theme].activeTintColor }]}>
              {posts?.length ?? 0}
            </Text>
            <Text style={[styles.detailsText, { color: themes[theme].activeTintColor }]}>
              {I18n.t('Posts')}
            </Text>
          </View>
          <View style={{ flex: 1, borderLeftWidth: 1, borderRightWidth: 1, borderLeftColor: themes[theme].borderColor, borderRightColor: themes[theme].borderColor }}>
            <TouchableOpacity onPress={() => navigation.push('Follow', { type: FOLLOWING_USERS, account: account })}>
              <Text style={[styles.detailsTitle, { color: themes[theme].titleColor }]}>
                {account.followings?.length ?? 0}
              </Text>
              <Text style={[styles.detailsText, { color: themes[theme].activeTintColor }]}>
                {I18n.t('Followings')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.push('Follow', { type: FOLLOWER_USERS, account: account })}>
              <Text style={[styles.detailsTitle, { color: themes[theme].activeTintColor }]}>
                {account.followers?.length ?? 0}
              </Text>
              <Text style={[styles.detailsText, { color: themes[theme].activeTintColor }]}>
                {I18n.t('Followers')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <TouchableOpacity
            style={[styles.actionContainer, {
              backgroundColor: themes[theme].backgroundColor, borderColor: themes[theme].borderColor,
              flexGrow: 1,
            }]}
            onPress={() => onToggleFollow(following)}
          >
            <Text
              style={[
                styles.actionText,
                { color: following ? COLOR_YELLOW : themes[theme].activeTintColor },
              ]}>
              {following ? I18n.t('Following') : I18n.t('Follow')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 16, justifyContent: 'center' }} onPress={sendMessage}>
            <VectorIcon type="MaterialCommunityIcons" name="chat-processing-outline" color={themes[theme].textColor} size={32} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.divider, { borderColor: themes[theme].borderColor }]} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        onIndexChange={setIndex}
      />

      {isLoading ? (
        <ActivityIndicator absolute size="large" theme={theme} />
      ) : null}
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(OtherProfileView)))
