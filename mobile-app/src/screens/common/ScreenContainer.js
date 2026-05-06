import { StyleSheet, View } from 'react-native';

const ScreenContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 20,
    backgroundColor: '#f6f8fb'
  }
});

export default ScreenContainer;
