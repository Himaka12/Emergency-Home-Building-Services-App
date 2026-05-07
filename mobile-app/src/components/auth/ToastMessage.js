import { Animated, SafeAreaView, StyleSheet, Text } from 'react-native';

const ToastMessage = ({ animatedStyle, message }) => {
  if (!message) {
    return null;
  }

  return (
    <Animated.View accessibilityLiveRegion="polite" style={[styles.toast, animatedStyle]}>
      <SafeAreaView style={styles.toastSafeArea}>
        <Text style={styles.toastText}>{message}</Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  toastSafeArea: {
    width: '82%',
    minHeight: 42,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#dc2626',
    shadowColor: '#dc2626',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8
  },
  toastText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 17,
    textAlign: 'center'
  }
});

export default ToastMessage;
