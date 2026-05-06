import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OnboardingPagination from './OnboardingPagination';

const OnboardingThirdScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Text style={styles.title}>Third onboarding screen</Text>
      <Text style={styles.subtitle}>Send the next image and I will place it here.</Text>
      <OnboardingPagination activeIndex={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: '#ffffff'
  },
  title: {
    color: '#071330',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 12,
    color: '#6f7482',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  }
});

export default OnboardingThirdScreen;
