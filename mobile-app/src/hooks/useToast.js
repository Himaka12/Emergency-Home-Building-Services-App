import { Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';

const TOAST_DURATION = 2600;

const useToast = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('error');
  const animation = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const showToast = (nextMessage, nextType = 'error') => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setMessage(nextMessage);
    setType(nextType);
    animation.setValue(0);
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 90
    }).start();

    timer.current = setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          setMessage('');
        }
      });
    }, TOAST_DURATION);
  };

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-8, 0]
        })
      }
    ]
  };

  return {
    toastProps: {
      animatedStyle,
      message,
      type
    },
    showToast
  };
};

export default useToast;
