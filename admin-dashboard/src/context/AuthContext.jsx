import { createContext, useContext, useMemo, useState } from 'react';
import { getCurrentUser, loginAdmin } from '../api/authApi.js';
import { ROLES } from '../constants/roles.js';
import { getStoredToken, removeToken, storeToken } from '../services/tokenService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginAdmin(credentials);

      if (data.user.role !== ROLES.ADMIN) {
        throw new Error('Only admin users can access the dashboard');
      }

      storeToken(data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    if (!getStoredToken()) {
      return null;
    }

    const data = await getCurrentUser();
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      loadCurrentUser
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
