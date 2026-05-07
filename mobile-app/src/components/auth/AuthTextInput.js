import { StyleSheet, Text, TextInput, View } from 'react-native';

const AuthTextInput = ({ label, onFocus, style, ...inputProps }) => {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocus}
        placeholderTextColor="#a4a9b6"
        style={[styles.input, style]}
        {...inputProps}
      />
    </View>
  );
};

export const authInputStyles = {
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
  }
};

const styles = StyleSheet.create({
  fieldGroup: {
    gap: 10
  },
  label: {
    color: '#11172b',
    fontSize: 15,
    fontWeight: '900'
  },
  input: authInputStyles.input
});

export default AuthTextInput;
