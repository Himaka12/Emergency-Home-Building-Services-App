import axios from 'axios';
import Constants from 'expo-constants';
import { getToken } from '../storage/tokenStorage';

const DEFAULT_ANDROID_EMULATOR_API_URL = 'http://10.0.2.2:5000/api';

const getExpoDevServerApiUrl = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;

  if (!hostUri) {
    return '';
  }

  const host = hostUri.split(':')[0];
  return host ? `http://${host}:5000/api` : '';
};

const getApiBaseUrl = () => {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (configuredUrl && configuredUrl !== DEFAULT_ANDROID_EMULATOR_API_URL) {
    return configuredUrl;
  }

  return getExpoDevServerApiUrl() || configuredUrl || DEFAULT_ANDROID_EMULATOR_API_URL;
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
