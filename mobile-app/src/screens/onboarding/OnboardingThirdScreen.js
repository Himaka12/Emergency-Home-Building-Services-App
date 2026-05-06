import OnboardingScreenLayout from './OnboardingScreenLayout';

const onboardingImage = require('../../assets/images/onboarding-service.png');

const OnboardingThirdScreen = ({ navigation }) => {
  const goToLogin = () => {
    navigation.replace('Home');
  };

  return (
    <OnboardingScreenLayout
      activeIndex={2}
      buttonLabel="Let's go"
      image={onboardingImage}
      onPress={goToLogin}
    />
  );
};

export default OnboardingThirdScreen;
