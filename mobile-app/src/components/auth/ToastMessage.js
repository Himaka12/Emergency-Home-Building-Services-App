import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ToastMessage = ({ animatedStyle, message, type = 'error' }) => {
  const insets = useSafeAreaInsets();

  if (!message) {
    return null;
  }

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      pointerEvents="none"
      style={[
        styles.toast,
        {
          paddingTop: insets.top + 10
        },
        animatedStyle
      ]}
    >
      <View style={[styles.toastSurface, styles[type]]}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    paddingHorizontal: 18
  },
  toastSurface: {
    maxWidth: 420,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 8
  },
  error: {
    backgroundColor: '#dc2626',
    shadowColor: '#dc2626'
  },
  success: {
    backgroundColor: '#16a34a',
    shadowColor: '#16a34a'
  },
  toastText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center'
  }
});

export default ToastMessage;
