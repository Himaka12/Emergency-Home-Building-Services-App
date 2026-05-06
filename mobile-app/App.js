import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingFirstScreen from './src/screens/onboarding/OnboardingFirstScreen';
import OnboardingSecondScreen from './src/screens/onboarding/OnboardingSecondScreen';
import OnboardingThirdScreen from './src/screens/onboarding/OnboardingThirdScreen';
import SplashScreen from './src/screens/SplashScreen';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'none',
            contentStyle: { backgroundColor: '#000000' }
          }}
        >
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="OnboardingFirst" component={OnboardingFirstScreen} />
          <RootStack.Screen name="OnboardingSecond" component={OnboardingSecondScreen} />
          <RootStack.Screen name="OnboardingThird" component={OnboardingThirdScreen} />
          <RootStack.Screen name="Home" component={AppNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
