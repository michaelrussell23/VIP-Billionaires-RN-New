import React, {useMemo, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {withTheme} from '../../theme';
import KeyboardView from '../../containers/KeyboardView';
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import SafeAreaView from '../../containers/SafeAreaView';
import {showErrorAlert, showToast} from '../../lib/info';
import {setUser as setUserAction} from '../../actions/login';
import CsTextInput from '../../containers/CsTextInput';
import ActivityIndicator from '../../containers/ActivityIndicator';
import firebaseSdk, {DB_ACTION_ADD} from '../../lib/firebaseSdk';
import I18n from '../../i18n';
import {COLOR_YELLOW, themes} from '../../constants/colors';
import i18n from '../../i18n';
import UploadPhoto from './UploadPhoto';
import Capture from './Capture';
import UploadVideo from './UploadVideo';
import Button from '../../containers/Button';
import SelectedMediaList from './SelectedMediaList/SelectedMediaList';
import {LOCALSTORAGE} from '../../utils/localStorage';

const CreatePostView = props => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textInputRef = useRef(null);

  const {user, theme} = props;
  const {handle} = user;

  const LOCAL_POST_ID = useMemo(() => `${handle}${new Date().getTime()}`, [handle]);

  const [medias, setMedias] = useState([]);

  const updateMedias = data => setMedias(m => [...m, ...data]);

  const onSubmit = () => {
    let post = {
      userId: user.userId,
      likes: [],
      comments: [],
      text: text.length > 0 ? text : null,
      date: new Date(),
      medias: [],
    };

    LOCALSTORAGE.getAllDataForKey(LOCAL_POST_ID)
      .then(data => {
        //As every media managed his upload itself, we need to check
        //if all uploads are completed

        if (!(data.length === medias.filter(m => !m.deleted).length)) {
          showToast(I18n.t('Some_upload_are_in_progress'));
          return;
        }

        post.medias = data;
        savePost(post);
      })
      .catch(error => {
        console.log(error);
        savePost(post);
      });
  };

  const savePost = post => {
    setIsLoading(true);
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_ADD, post)
      .then(() => {
        showToast(I18n.t('Publish_post_complete'));
        LOCALSTORAGE.clearMapForKey(LOCAL_POST_ID);
        navigation.popToTop();
      })
      .catch(error => {
        console.log(error);
        showErrorAlert(I18n.t('Publish_post_failed'));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={[sharedStyles.container, {backgroundColor: themes[theme].navbarBackground}]}>
      <StatusBar />
      <KeyboardView
        contentContainerStyle={[
          sharedStyles.contentContainer,
          {
            backgroundColor: themes[theme].backgroundColor,
            height: '100%',
          },
        ]}
        keyboardVerticalOffset={128}>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 10, paddingHorizontal: 16}} {...scrollPersistTaps}>
          {isLoading && <ActivityIndicator absolute theme={theme} size={'large'} />}
          <Text numberOfLines={1} style={[styles.whatsOn, {color: themes[theme].titleColor}]}>
            ✍️ {i18n.t('Whats_on_your_mind')} <Text style={{color: COLOR_YELLOW}}>{handle}</Text>{' '}
          </Text>

          <View style={styles.inputContainer}>
            <CsTextInput
              inputRef={textInputRef}
              containerStyle={[
                styles.roundInput,
                { borderColor: themes[theme].borderColor, backgroundColor: themes[theme].messageOwnBackground },
              ]}
              inputStyle={[styles.textStyle, { color: themes[theme].textColor }]}
              wrapStyle={{ alignItems: 'flex-start', paddingVertical: 12 }}
              returnKeyType="send"
              keyboardType="default"
              onChangeText={val => setText(val)}
              multiline={true}
              theme={theme}
              maxLength={512}
              withCount
              value={text}
              placeholder="Write something here"
              placeholderTextColor={themes[theme].subTextColor}
            />
          </View>

          <SelectedMediaList medias={medias} localPostID={LOCAL_POST_ID} onUpdate={setMedias} />

          <UploadPhoto onNextPress={updateMedias} />
          <Capture onCapture={updateMedias} />
          <UploadVideo onNextPress={updateMedias} />

          <Button
            title={i18n.t('Publish')}
            theme={theme}
            size={'button_size_W'}
            style={{marginVertical: 17}}
            onPress={onSubmit}
          />
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CreatePostView))
