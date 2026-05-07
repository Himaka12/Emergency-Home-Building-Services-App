import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import KeyboardAwareScrollView from '../KeyboardAwareScrollView';

const logo = require('../../assets/images/home-guard-logo.png');

const AuthSheet = ({ children, title }) => {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <View style={styles.sheet}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAwareScrollView contentContainerStyle={styles.content} keyboardOffset={24}>
            {(keyboard) => (
              <>
                <View style={styles.handle} />
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.title}>{title}</Text>
                {children(keyboard)}
              </>
            )}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  safeArea: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 28
  },
  handle: {
    alignSelf: 'center',
    width: 54,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e1e4ec'
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 104,
    marginTop: 38
  },
  title: {
    marginTop: 26,
    color: '#11172b',
    fontSize: 35,
    fontWeight: '900',
    lineHeight: 42,
    textAlign: 'center'
  }
});

export default AuthSheet;
