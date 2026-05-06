import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const homeGuardLogo = require('../assets/images/home-guard-logo.png');
const SPLASH_DURATION_MS = 2000;

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <Image source={homeGuardLogo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  logo: {
    width: '78%',
    maxWidth: 420,
    aspectRatio: 1.5
  }
});

export default SplashScreen;
