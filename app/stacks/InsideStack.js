import React from 'react'
import { Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeContext } from '../theme'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SidebarView from '../views/SidebarView'
import HomeView from '../views/HomeView'
import RecentView from '../views/HomeView/recent'
import PopularView from '../views/HomeView/popular'
import ProfileView from '../views/ProfileView'
import ProfileEditView from '../views/ProfileEditView'
import FindFriendView from '../views/FindFriendView'
import FriendView from '../views/FriendView'
import FollowView from '../views/FollowView'
import CreatePostView from '../views/CreatePostView'
import PostDetailView from '../views/PostDetailView'
import MessageView from '../views/MessageView'
import ChatView from '../views/ChatView'
import SettingView from '../views/SettingView'
import OtherProfileView from '../views/OtherProfileView'
import ActivityView from '../views/ActivityView'
import CategoryView from '../views/CategoryView'
import VipMembersClubView from '../views/VipMembersClubView'
import ProductDetailView from '../views/ProductDetailView'
import EditPostView from '../views/EditPostView'
import ProductWebView from '../views/ProductWebView'
import PickLibraryView from '../views/PickLibraryView'
import UpdateProfileAndBasicInfo from '../views/UpdateProfileAndBasicInfo'
import { MainTabBar } from '../containers/MainScreen'
import MenuStack from './MenuStack'
import AboutStack from './AboutStack'

import HeaderLeft from '../containers/HeaderLeft';
import {themes} from '../constants/colors';

const Tab = createBottomTabNavigator();
const Inside = createStackNavigator();

const HomeStack = () => (
  <Inside.Navigator>
    <Inside.Screen name="Home" component={HomeView} options={{headerShown: false}} />
    <Inside.Screen name="Posts" component={PostsView} options={{headerShown: false}} />
  </Inside.Navigator>
);

const TabStack = () => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <Tab.Navigator
      tabBar={props => <MainTabBar theme={theme} {...props} />}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      // initialRouteName={'Profile'}
    >
      <Tab.Screen name="Home" component={HomeView} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={ProfileView} />
      <Tab.Screen name="Message" component={MessageView} options={{headerShown: false}} />
      <Tab.Screen name="Activity" component={ActivityView} />
    </Tab.Navigator>
  )
}

const InsideStack = () => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <Inside.Navigator
    // screenOptions={{
    //   ...outsideHeader,
    //   ...themedHeader(theme),
    //   ...StackAnimation,
    // }}
    >
      <Inside.Screen name="Home" component={TabStack} options={{headerShown: false}} />
      <Inside.Screen name="Recent" component={RecentView} options={RecentView.navigationOptions} />
      <Inside.Screen name="Popular" component={PopularView} options={PopularView.navigationOptions} />
      <Inside.Screen name="ProfileEdit" component={ProfileEditView} />
      <Inside.Screen name="Friend" component={FriendView} options={FriendView.navigationOptions} />
      <Inside.Screen name="FindFriend" component={FindFriendView} options={{headerShown: false}} />
      <Inside.Screen name="OtherProfile" component={OtherProfileView} options={{headerShown: false}} />
      <Inside.Screen name="Follow" component={FollowView} />
      <Inside.Screen
        name="CreatePost"
        component={CreatePostView}
        options={navigation => ({
          headerLeft: () => <HeaderLeft props={navigation} to="Home" />,
          headerTitle: () => <></>,
          gestureEnabled: false,
          headerStyle: {backgroundColor: themes[theme].backgroundColor},
        })}
      />
      <Inside.Screen name="EditPost" component={EditPostView} />
      <Inside.Screen name="PostDetail" component={PostDetailView} options={{headerShown: false}} />
      <Inside.Screen name="Chat" component={ChatView} />
      <Inside.Screen name="Setting" component={SettingView} />
      <Inside.Screen name="ProductWeb" component={ProductWebView} />
      <Inside.Screen name="Category" component={CategoryView} options={CategoryView.navigationOptions} />
      <Inside.Screen name="VipMembers" component={VipMembersClubView} options={VipMembersClubView.navigationOptions} />
      <Inside.Screen name="ProductDetail" component={ProductDetailView} />
      <Inside.Screen name="PickLibrary" component={PickLibraryView} />
      <Inside.Screen
        name="UpdateProfileAndBasicInfo"
        component={UpdateProfileAndBasicInfo}
        options={{ headerShown: false }}
      />
    </Inside.Navigator>
  )
}
const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={({navigation, state}) => <SidebarView navigation={navigation} state={state} />}
      initialRouteName="InsideStack"
      screenListeners={({navigation}) => {
        const {history} = navigation.getState();
        if (history.length > 2 && history.filter(i => i.type === 'drawer').length > 0) {
          navigation.navigate('InsideStack');
          navigation.toggleDrawer();
        }
      }}
      screenOptions={{
        swipeEnabled: true,
        drawerStyle: {
          width: Dimensions.get('window').width,
        },
      }}>
      <Drawer.Screen name="InsideStack" component={InsideStack} options={{headerShown: false}} />
      <Drawer.Screen name="MenuStack" component={MenuStack} options={{headerShown: false}} />
      <Drawer.Screen name="AboutStack" component={AboutStack} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
