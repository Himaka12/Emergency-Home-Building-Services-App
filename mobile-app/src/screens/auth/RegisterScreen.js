import { useState } from 'react';
import { Alert, Button, Text, TextInput } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ScreenContainer from '../common/ScreenContainer';

const RegisterScreen = () => {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer'
  });

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      await register(form);
    } catch (error) {
      Alert.alert('Registration failed', error.response?.data?.message || 'Please check your details.');
    }
  };

  return (
    <ScreenContainer>
      <Text>Register</Text>
      <TextInput placeholder="Name" value={form.name} onChangeText={(value) => updateField('name', value)} />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(value) => updateField('email', value)}
      />
      <TextInput placeholder="Phone" value={form.phone} onChangeText={(value) => updateField('phone', value)} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(value) => updateField('password', value)}
      />
      <TextInput
        placeholder="Role: customer or worker"
        value={form.role}
        onChangeText={(value) => updateField('role', value)}
      />
      <Button title={loading ? 'Creating...' : 'Register'} onPress={handleRegister} />
    </ScreenContainer>
  );
};

export default RegisterScreen;
