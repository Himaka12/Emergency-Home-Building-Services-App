import { StyleSheet, View } from 'react-native';

const OnboardingPagination = ({ activeIndex, style }) => {
  return (
    <View pointerEvents="none" style={[styles.container, style]}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index && styles.activeDot
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '11.8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#dedfe3'
  },
  activeDot: {
    backgroundColor: '#ff5b0a'
  }
});

export default OnboardingPagination;
