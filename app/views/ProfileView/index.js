import React, { useState, useEffect } from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import ImagePicker from 'react-native-image-crop-picker'
import { isEmpty } from 'lodash'
import { COLOR_BTN_BACKGROUND, COLOR_TRANSPARENT, COLOR_WHITE, COLOR_YELLOW, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import images from '../../assets/images'
import styles from './styles'
import { setUser as setUserAction } from '../../actions/login'
import ActivityIndicator from '../../containers/ActivityIndicator'
import firebaseSdk, { DB_ACTION_DELETE, DB_ACTION_UPDATE, NOTIFICATION_TYPE_LIKE } from '../../lib/firebaseSdk'
import { showErrorAlert, showToast } from '../../lib/info'
import { VectorIcon } from '../../containers/VectorIcon'
import I18n from '../../i18n'
import { checkCameraPermission, checkPhotosPermission, backImagePickerConfig } from '../../utils/permissions'
import { isValidURL } from '../../utils/validators'
import { withActionSheet } from '../../containers/ActionSheet'
import sharedStyles from '../Styles'
import Button from '../../containers/Button'
import { SceneMap, TabView } from 'react-native-tab-view'
import Post from '../../containers/Post/Post'
import { onSharePost } from '../../utils/const'
import { FOLLOWER_USERS, FOLLOWING_USERS, POST_TYPE_PHOTO, POST_TYPE_TEXT, POST_TYPE_VIDEO } from '../../constants/app'
import MediaView from '../../containers/MediaView'

const { width } = Dimensions.get('screen')
const ProfileView = ({ navigation, user, theme, setUser }) => {
  const layout = useWindowDimensions()
  const [state, setState] = useState({
    posts: [],
    isLoading: true,
  })

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Post' },
    { key: 'second', title: 'Media' },
  ])

  const { posts, isLoading } = state
  let unSubscribePost = ''
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.header} onPress={() => navigation.toggleDrawer()}>
          <VectorIcon type="MaterialCommunityIcons" name="menu" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      title: 'VIP BILLIONAIRES',
      headerRight: () => (
        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('FindFriend')}>
          <VectorIcon type="MaterialCommunityIcons" name="magnify" color={themes[theme].titleColor} size={24} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    })
  }, [theme])

  useEffect(() => {
    init()
  }, [user])

  const setSafeState = states => {
    setState({ ...state, ...states })
  }

  const init = () => {
    setState({ ...state, isLoading: true })
    firebaseSdk
      .getUser(user.userId)
      .then(self => {
        const userPostSubscribe = firestore().collection(firebaseSdk.TBL_POST).where('userId', '==', user.userId)
        unSubscribePost = userPostSubscribe.onSnapshot(querySnap => {
          let posts = []
          if (querySnap) {
            querySnap.forEach(doc => {
              posts.push({ id: doc.id, ...doc.data(), owner: self })
            })
            posts.sort((a, b) => b.date - a.date)
            setSafeState({ isLoading: false, posts })
          }
        })
      })
      .catch(() => {
        setSafeState({ isLoading: false })
      })
  }

  const onOpenPost = item => {
    if (item) {
      navigation.push('PostDetail', { post: item })
    }
  }

  const onToggleLike = (item, isLiking) => {
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
          const postImage = item.type === 'video' ? item?.thumbnail : item.type === 'photo' ? item?.photo : ''
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
            message: `${user.displayName} ${I18n('likes_your_post')}.`,
            date: new Date(),
          }
          firebaseSdk.addActivity(activity, item.owner.token).then(r => {})
        }
      })
      .catch(() => {
        setState({ ...state, isLoading: false })
      })
  }

  const openLink = url => {
    if (url && url.length > 0 && isValidURL(url)) {
      Linking.openURL(url)
    }
  }

  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(backImagePickerConfig).then(image => {
        onUpdateUser(image.path)
      })
    }
  }

  const chooseFromLibrary = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(backImagePickerConfig).then(image => {
        onUpdateUser(image.path)
      })
    }
  }

  const onUpdateUser = image_path => {
    setState({ ...state, isLoading: true })
    if (image_path) {
      firebaseSdk
        .uploadMedia(firebaseSdk.STORAGE_TYPE_AVATAR, image_path)
        .then(image_url => {
          let userInfo = {
            id: user.id,
            avatar: image_url,
          }

          firebaseSdk
            .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
            .then(() => {
              setState({ ...state, isLoading: false })
              const updateUser = { ...user, ...userInfo }
              setUser(updateUser)
              init()
            })
            .catch(err => {
              showToast(I18n.t(err.message))
              setState({ ...state, isLoading: false })
            })
        })
        .catch(err => {
          showErrorAlert(err, I18n.t('Oops'))
          setState({ ...state, isLoading: false })
        })
    }
  }

  const onEditAvatar = () => {
    Alert.alert('', I18n.t('Upload_photo'), [
      { text: I18n.t('Cancel'), onPress: () => {} },
      { text: I18n.t('Take_a_photo'), onPress: () => takePhoto() },
      { text: I18n.t('Choose_a_photo'), onPress: () => chooseFromLibrary() },
    ])
  }

  if (!user) {
    return null
  }

  const onActionPost = item => {
    const onEdit = () => {
      navigation.push('EditPost', { postId: item.id })
    }

    const onRemove = () => {
      setState({ ...state, isLoading: true })
      firebaseSdk
        .setData(firebaseSdk.TBL_POST, DB_ACTION_DELETE, { id: item.id })
        .then(() => {
          showToast(I18n.t('Remove_post_complete'))
          setState({ ...state, isLoading: false })
          init()
        })
        .catch(() => {
          showErrorAlert(I18n.t('Remove_post_failed'), I18n.t('Oops'))
          setState({ ...state, isLoading: false })
        })
    }

    const ownerOptions = [
      { title: I18n.t('Edit'), onPress: onEdit },
      { title: I18n.t('Remove'), onPress: onRemove },
    ]
    return { options: ownerOptions }
  }

  const renderScene = SceneMap({
    first: () => <RenderPostItem posts={posts.filter(p => p.type === POST_TYPE_TEXT || p.type === POST_TYPE_PHOTO)} />,
    second: () => (
      <MediaView
        posts={posts.filter(p => p.type === POST_TYPE_PHOTO || p.type === POST_TYPE_VIDEO)}
        onOpenPost={onOpenPost}
        theme={theme}
      />
    ),
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

  const renderTabBar = props => {
    return (
      <View style={[styles.tabBar, { backgroundColor: themes[theme].buttonBackground }]}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.tabItem,
                index === i ? styles.activeTab : '',
                {
                  backgroundColor: index === i ? COLOR_BTN_BACKGROUND : COLOR_TRANSPARENT,
                },
              ]}
              onPress={() => setIndex(i)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color: index === i ? COLOR_WHITE : themes[theme].textColor,
                  },
                ]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
      <StatusBar />
      {isLoading ? <ActivityIndicator absolute size="large" theme={theme} /> : null}
      <SafeAreaView style={sharedStyles.container}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { borderColor: themes[theme].borderColor }]}>
            <Image source={user.avatar ? { uri: user.avatar } : images.default_avatar} style={styles.avatar} />
            <View style={{ width: 24 }}>
              <TouchableOpacity onPress={() => onEditAvatar()} style={[styles.icon, styles.imgPlus]}>
                <VectorIcon name={'plus'} size={20} color={COLOR_WHITE} type={'MaterialCommunityIcons'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileTitle, { color: themes[theme].titleColor }]}>{user.displayName}</Text>
          {user.handle && user.handle.length > 0 ? (
            <Text style={[styles.profileText, { color: themes[theme].textColor }]}>{user.handle}</Text>
          ) : null}
          {user.bio && user.bio.length > 0 ? (
            <Text style={[styles.profileText, { color: themes[theme].textColor }]}>{user.bio}</Text>
          ) : null}
          {user.website && user.website.length > 0 ? (
            <TouchableOpacity onPress={() => openLink(user.website)}>
              <Text style={[styles.profileText, { color: COLOR_YELLOW }]}>{user.website}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Button
            style={styles.submitBtn}
            title={'Edit Profile'}
            size="W"
            onPress={() => navigation.push('ProfileEdit')}
            theme={theme}
          />
        </View>
        <View style={styles.details}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.detailsTitle, { color: themes[theme].activeTintColor }]}>{posts?.length ?? 0}</Text>
            <Text style={[styles.detailsText, { color: themes[theme].subTextColor }]}>{I18n.t('Posts')}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderLeftColor: themes[theme].borderColor,
              borderRightColor: themes[theme].borderColor,
            }}>
            <TouchableOpacity onPress={() => navigation.push('Follow', { type: FOLLOWING_USERS, account: user })}>
              <Text style={[styles.detailsTitle, { color: themes[theme].titleColor }]}>
                {user.followings?.length ?? 0}
              </Text>
              <Text style={[styles.detailsText, { color: themes[theme].subTextColor }]}>{I18n.t('Followings')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.push('Follow', { type: FOLLOWER_USERS, account: user })}>
              <Text style={[styles.detailsTitle, { color: themes[theme].activeTintColor }]}>
                {user.followers?.length ?? 0}
              </Text>
              <Text style={[styles.detailsText, { color: themes[theme].subTextColor }]}>{I18n.t('Followers')}</Text>
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
      </SafeAreaView>
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withActionSheet(withTheme(ProfileView)))
