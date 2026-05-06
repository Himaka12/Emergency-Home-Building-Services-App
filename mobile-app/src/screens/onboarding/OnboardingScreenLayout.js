import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OnboardingPagination from './OnboardingPagination';

const OnboardingScreenLayout = ({
  activeIndex,
  buttonLabel,
  image,
  onPress,
  paginationStyle
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <ImageBackground source={image} style={styles.artwork} resizeMode="cover">
        <OnboardingPagination activeIndex={activeIndex} style={paginationStyle} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={buttonLabel}
          onPress={onPress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text style={styles.buttonText}>{buttonLabel}</Text>
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
    alignItems: 'center',
    justifyContent: 'flex-end'
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

export default OnboardingScreenLayout;
