import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

const KeyboardAwareScrollView = forwardRef(
  (
    {
      children,
      contentContainerStyle,
      keyboardOffset = 18,
      style,
      ...scrollViewProps
    },
    ref
  ) => {
    const scrollRef = useRef(null);

    const scrollToFocusedInput = useCallback(
      (event) => {
        const inputHandle = event?.target;

        if (!inputHandle) {
          return;
        }

        requestAnimationFrame(() => {
          scrollRef.current
            ?.getScrollResponder()
            ?.scrollResponderScrollNativeHandleToKeyboard(inputHandle, keyboardOffset, true);
        });
      },
      [keyboardOffset]
    );

    useImperativeHandle(ref, () => ({
      scrollToFocusedInput
    }));

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
        style={[styles.container, style]}
      >
        <ScrollView
          ref={scrollRef}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          {...scrollViewProps}
        >
          {typeof children === 'function' ? children({ scrollToFocusedInput }) : children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default KeyboardAwareScrollView;
