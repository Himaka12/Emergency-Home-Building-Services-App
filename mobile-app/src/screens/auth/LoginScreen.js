import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import AuthSheet from '../../components/auth/AuthSheet';
import AuthTextInput, { authInputStyles } from '../../components/auth/AuthTextInput';
import ToastMessage from '../../components/auth/ToastMessage';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { isAuthenticated, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastAnimation = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.getParent()?.replace('Home');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = (message) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToastMessage(message);
    toastAnimation.setValue(0);
    Animated.spring(toastAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 90
    }).start();

    toastTimer.current = setTimeout(() => {
      Animated.timing(toastAnimation, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          setToastMessage('');
        }
      });
    }, 2600);
  };

  const handleLogin = async () => {
    if (loading) {
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail && !password) {
      showToast('Enter email address and password.');
      return;
    }

    if (!trimmedEmail) {
      showToast('Enter your email address.');
      return;
    }

    if (!password) {
      showToast('Enter your password.');
      return;
    }

    try {
      await login({ email: trimmedEmail, password });
    } catch (error) {
      showToast('Wrong email or password.');
    }
  };

  const toastStyle = {
    opacity: toastAnimation,
    transform: [
      {
        translateY: toastAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-8, 0]
        })
      }
    ]
  };

  return (
    <View style={styles.screen}>
      <ToastMessage animatedStyle={toastStyle} message={toastMessage} />
      <AuthSheet title="Log in or sign up">
        {({ scrollToFocusedInput }) => (
          <>
            <View style={styles.form}>
              <AuthTextInput
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                label="Email address"
                onChangeText={setEmail}
                onFocus={scrollToFocusedInput}
                placeholder="you@example.com"
                value={email}
              />

              <View style={styles.passwordGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordField}>
                  <TextInput
                    autoComplete="password"
                    onChangeText={setPassword}
                    onFocus={scrollToFocusedInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#a4a9b6"
                    secureTextEntry={!isPasswordVisible}
                    style={styles.passwordInput}
                    value={password}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
                    onPress={() => setIsPasswordVisible((current) => !current)}
                    hitSlop={12}
                  >
                    <Text style={styles.showText}>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Sign in"
                disabled={loading}
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.signInButton,
                  pressed && styles.signInButtonPressed,
                  loading && styles.disabledButton
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.signInText}>Sign In</Text>
                )}
              </Pressable>
            </View>

            <View style={styles.registerRow}>
              <Text style={styles.registerPrompt}>Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate('Register')} hitSlop={10}>
                <Text style={styles.registerLink}>Register here</Text>
              </Pressable>
            </View>
          </>
        )}
      </AuthSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  form: {
    marginTop: 26,
    gap: 22
  },
  passwordGroup: {
    gap: 10
  },
  label: {
    color: '#11172b',
    fontSize: 15,
    fontWeight: '900'
  },
  passwordField: {
    ...authInputStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 18
  },
  passwordInput: {
    flex: 1,
    color: '#11172b',
    fontSize: 18,
    fontWeight: '700'
  },
  showText: {
    color: '#f05a0a',
    fontSize: 16,
    fontWeight: '900'
  },
  signInButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#ff5b0a',
    shadowColor: '#ff5b0a',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 20,
    elevation: 7
  },
  signInButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }]
  },
  disabledButton: {
    opacity: 0.72
  },
  signInText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900'
  },
  registerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 30
  },
  registerPrompt: {
    color: '#727b92',
    fontSize: 16,
    fontWeight: '700'
  },
  registerLink: {
    color: '#11172b',
    fontSize: 16,
    fontWeight: '900'
  },
  pressed: {
    opacity: 0.68
  }
});

export default LoginScreen;
