import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AuthSheet from '../../components/auth/AuthSheet';
import AuthTextInput from '../../components/auth/AuthTextInput';
import { ROLES } from '../../constants/roles';
import { useAuth } from '../../context/AuthContext';

const roleOptions = [
  { label: 'Customer', value: ROLES.CUSTOMER },
  { label: 'Worker', value: ROLES.WORKER }
];

const RegisterScreen = ({ navigation }) => {
  const { isAuthenticated, register, loading } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: ROLES.CUSTOMER
  });
  const [selectorWidth, setSelectorWidth] = useState(0);
  const roleAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAuthenticated) {
      navigation.getParent()?.replace('Home');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    Animated.spring(roleAnimation, {
      toValue: form.role === ROLES.WORKER ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 90
    }).start();
  }, [form.role, roleAnimation]);

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const selectRole = (role) => {
    updateField('role', role);
    scaleAnimation.setValue(0.97);
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 120
    }).start();
  };

  const handleRegister = async () => {
    if (loading) {
      return;
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim()
    };

    try {
      await register(payload);
    } catch (error) {
      Alert.alert('Registration failed', error.response?.data?.message || 'Please check your details.');
    }
  };

  const indicatorTranslateX = roleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, selectorWidth / 2]
  });

  return (
    <AuthSheet title="Create account">
      {({ scrollToFocusedInput }) => (
        <>
          <View
            style={styles.roleSelector}
            onLayout={(event) => setSelectorWidth(event.nativeEvent.layout.width)}
          >
            {selectorWidth > 0 && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.roleIndicator,
                  {
                    width: selectorWidth / 2 - 6,
                    transform: [
                      { translateX: indicatorTranslateX },
                      { scale: scaleAnimation }
                    ]
                  }
                ]}
              />
            )}
            {roleOptions.map((option) => {
              const isSelected = form.role === option.value;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => selectRole(option.value)}
                  style={styles.roleOption}
                >
                  <Text style={[styles.roleText, isSelected && styles.selectedRoleText]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.form}>
            <AuthTextInput
              autoComplete="name"
              label="Name"
              onChangeText={(value) => updateField('name', value)}
              onFocus={scrollToFocusedInput}
              placeholder="Your name"
              value={form.name}
            />
            <AuthTextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              label="Email address"
              onChangeText={(value) => updateField('email', value)}
              onFocus={scrollToFocusedInput}
              placeholder="you@example.com"
              value={form.email}
            />
            <AuthTextInput
              autoComplete="tel"
              keyboardType="phone-pad"
              label="Phone"
              onChangeText={(value) => updateField('phone', value)}
              onFocus={scrollToFocusedInput}
              placeholder="Phone number"
              value={form.phone}
            />
            <AuthTextInput
              autoComplete="new-password"
              label="Password"
              onChangeText={(value) => updateField('password', value)}
              onFocus={scrollToFocusedInput}
              placeholder="Create password"
              secureTextEntry
              value={form.password}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Register"
              disabled={loading}
              onPress={handleRegister}
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.registerButtonPressed,
                loading && styles.disabledButton
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.registerText}>Register</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')} hitSlop={10}>
              <Text style={styles.loginLink}>Sign in</Text>
            </Pressable>
          </View>
        </>
      )}
    </AuthSheet>
  );
};

const styles = StyleSheet.create({
  roleSelector: {
    position: 'relative',
    flexDirection: 'row',
    minHeight: 62,
    marginTop: 26,
    borderWidth: 2,
    borderColor: '#f1e2da',
    borderRadius: 26,
    padding: 3,
    backgroundColor: '#fff8f4',
    overflow: 'hidden'
  },
  roleIndicator: {
    position: 'absolute',
    left: 3,
    top: 3,
    bottom: 3,
    borderRadius: 22,
    backgroundColor: '#ff5b0a',
    shadowColor: '#ff5b0a',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 5
  },
  roleOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  roleText: {
    color: '#8d6c5d',
    fontSize: 17,
    fontWeight: '900'
  },
  selectedRoleText: {
    color: '#ffffff'
  },
  form: {
    marginTop: 24,
    gap: 18
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
    minHeight: 60,
    borderWidth: 2,
    borderColor: '#e1e0ea',
    borderRadius: 24,
    paddingHorizontal: 20,
    color: '#11172b',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: '#ffffff'
  },
  registerButton: {
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
  registerButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }]
  },
  disabledButton: {
    opacity: 0.72
  },
  registerText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900'
  },
  loginRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 26
  },
  loginPrompt: {
    color: '#727b92',
    fontSize: 16,
    fontWeight: '700'
  },
  loginLink: {
    color: '#11172b',
    fontSize: 16,
    fontWeight: '900'
  }
});

export default RegisterScreen;
