import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import { useAuth } from '../../context/AuthContext';

const logo = require('../../assets/images/home-guard-logo.png');

const LoginScreen = ({ navigation }) => {
  const { isAuthenticated, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.getParent()?.replace('Home');
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert('Login failed', error.response?.data?.message || 'Please check your credentials.');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <View style={styles.sheet}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            keyboardOffset={24}
          >
            {({ scrollToFocusedInput }) => (
              <>
                <View style={styles.handle} />

                <Image source={logo} style={styles.logo} resizeMode="contain" />

                <Text style={styles.title}>Log in or sign up</Text>

                <View style={styles.form}>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoComplete="email"
                      keyboardType="email-address"
                      onChangeText={setEmail}
                      onFocus={scrollToFocusedInput}
                      placeholder="you@example.com"
                      placeholderTextColor="#a4a9b6"
                      style={styles.input}
                      value={email}
                    />
                  </View>

                  <View style={styles.fieldGroup}>
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
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff'
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  safeArea: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 28
  },
  handle: {
    alignSelf: 'center',
    width: 54,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e1e4ec'
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 104,
    marginTop: 44
  },
  title: {
    marginTop: 28,
    color: '#11172b',
    fontSize: 35,
    fontWeight: '900',
    lineHeight: 42,
    textAlign: 'center'
  },
  form: {
    marginTop: 34,
    gap: 22
  },
  fieldGroup: {
    gap: 10
  },
  label: {
    color: '#11172b',
    fontSize: 15,
    fontWeight: '900'
  },
  input: {
    minHeight: 62,
    borderWidth: 2,
    borderColor: '#e1e0ea',
    borderRadius: 24,
    paddingHorizontal: 20,
    color: '#11172b',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: '#ffffff'
  },
  passwordField: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e1e0ea',
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 18,
    backgroundColor: '#ffffff'
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
