import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updateCurrentUser,
  updateProfileImage
} from '../api/authApi';
import { getToken, removeToken, saveToken } from '../storage/tokenStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = await getToken();

      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        await removeToken();
      } finally {
        setInitializing(false);
      }
    };

    bootstrapAuth();
  }, []);

  const applyAuthResponse = async (data) => {
    await saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginUser(credentials);
      return applyAuthResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await registerUser(payload);
      return applyAuthResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const saveProfileImage = async (image) => {
    setLoading(true);
    try {
      const data = await updateProfileImage(image);
      return applyAuthResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (payload) => {
    setLoading(true);
    try {
      const data = await updateCurrentUser(payload);
      return applyAuthResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      initializing,
      isAuthenticated: Boolean(user),
      login,
      register,
      updateProfile,
      saveProfileImage,
      logout
    }),
    [user, loading, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
