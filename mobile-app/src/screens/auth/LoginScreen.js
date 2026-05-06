import { useState } from 'react';
import { Alert, Button, Text, TextInput } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ScreenContainer from '../common/ScreenContainer';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert('Login failed', error.response?.data?.message || 'Please check your credentials.');
    }
  };

  return (
    <ScreenContainer>
      <Text>Login</Text>
      <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} />
      <Button title="Create account" onPress={() => navigation.navigate('Register')} />
    </ScreenContainer>
  );
};

export default LoginScreen;
