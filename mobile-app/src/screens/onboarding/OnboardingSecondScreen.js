import { StyleSheet } from 'react-native';
import OnboardingScreenLayout from './OnboardingScreenLayout';

const onboardingImage = require('../../assets/images/onboarding-professionals.png');

const OnboardingSecondScreen = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('OnboardingThird');
  };

  return (
    <OnboardingScreenLayout
      activeIndex={1}
      buttonLabel="Get Started"
      image={onboardingImage}
      onPress={goToNextScreen}
      paginationStyle={styles.pagination}
    />
  );
};

const styles = StyleSheet.create({
  pagination: {
    bottom: '11.7%'
  }
});

export default OnboardingSecondScreen;
