import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OnboardingPagination from './OnboardingPagination';

const onboardingImage = require('../../assets/images/onboarding-security.png');

const OnboardingFirstScreen = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('OnboardingSecond');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <ImageBackground
        source={onboardingImage}
        style={styles.artwork}
        resizeMode="cover"
      >
        <OnboardingPagination activeIndex={0} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Get Started"
          onPress={goToNextScreen}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  artwork: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    width: '64%',
    maxWidth: 390,
    minHeight: 54,
    marginBottom: '8.8%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#ff5b0a',
    shadowColor: '#ff5b0a',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6
  },
  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }]
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '800'
  }
});

export default OnboardingFirstScreen;
