import OnboardingScreenLayout from './OnboardingScreenLayout';

const onboardingImage = require('../../assets/images/onboarding-security.png');

const OnboardingFirstScreen = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('OnboardingSecond');
  };

  return (
    <OnboardingScreenLayout
      activeIndex={0}
      buttonLabel="Get Started"
      image={onboardingImage}
      onPress={goToNextScreen}
    />
  );
};

export default OnboardingFirstScreen;
