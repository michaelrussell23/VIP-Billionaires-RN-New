import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCALSTORAGE = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 4,
  sync: {},
});
