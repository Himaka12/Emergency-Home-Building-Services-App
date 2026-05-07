import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
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
            contentStyle: { backgroundColor: '#ffffff' }
          }}
        >
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              animation: 'none',
              contentStyle: { backgroundColor: '#000000' }
            }}
          />
          <RootStack.Group
            screenOptions={{
              animation: 'slide_from_right',
              animationDuration: 320,
              gestureEnabled: true,
              fullScreenGestureEnabled: true
            }}
          >
            <RootStack.Screen name="OnboardingFirst" component={OnboardingFirstScreen} />
            <RootStack.Screen name="OnboardingSecond" component={OnboardingSecondScreen} />
            <RootStack.Screen name="OnboardingThird" component={OnboardingThirdScreen} />
          </RootStack.Group>
          <RootStack.Screen
            name="Home"
            component={AppNavigator}
            options={{
              animation: 'fade'
            }}
          />
          <RootStack.Screen
            name="AuthModal"
            component={AuthNavigator}
            options={{
              animation: 'slide_from_bottom',
              animationDuration: 320,
              contentStyle: { backgroundColor: '#ffffff' },
              gestureDirection: 'vertical',
              gestureEnabled: true,
              presentation: 'modal'
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
