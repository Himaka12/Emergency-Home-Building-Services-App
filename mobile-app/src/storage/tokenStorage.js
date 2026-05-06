import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'service_provider_mobile_token';

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const saveToken = (token) => AsyncStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => AsyncStorage.removeItem(TOKEN_KEY);
