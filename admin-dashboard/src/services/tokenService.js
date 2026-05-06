const TOKEN_KEY = 'service_provider_admin_token';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
