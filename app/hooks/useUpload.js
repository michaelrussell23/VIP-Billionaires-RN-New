import {useState, useEffect} from 'react';
import storage from '@react-native-firebase/storage';

export const useUpload = ({uri, id}) => {
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (uri) {
      let milliSeconds = new Date().getTime();
      const defaultId = `upload_${milliSeconds}`;
      let ref = storage().ref(id || defaultId);
      let upload = ref.putFile(uri);

      upload
        .then(async res => {
          const downloadURL = await ref.getDownloadURL();
          setUrl(downloadURL);
        })
        .catch(console.log);

      upload.on('state_changed', snapshot => {
        setProgress(Math.round((snapshot.bytesTransferred * 100) / snapshot.totalBytes));
      });
    }
  }, [uri]);

  return {
    url,
    progress,
  };
};
