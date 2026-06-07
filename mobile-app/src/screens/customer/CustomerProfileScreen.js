import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToastMessage from '../../components/auth/ToastMessage';
import { useAuth } from '../../context/AuthContext';
import useToast from '../../hooks/useToast';

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((word) => word.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const menuSections = [
  {
    title: 'Account',
    items: [
      {
        icon: 'person-circle-outline',
        title: 'Manage Profile',
        subtitle: 'Name, phone and customer details',
        route: 'ManageProfile'
      },
      { icon: 'lock-closed-outline', title: 'Password & Security', subtitle: 'Login and account safety' },
      { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Booking alerts and updates' },
      { icon: 'language-outline', title: 'Language', value: 'English' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'information-circle-outline', title: 'About Us', subtitle: 'Home Guard service details' },
      { icon: 'sunny-outline', title: 'Theme', value: 'Light' },
      {
        icon: 'calendar-outline',
        title: 'Appointments',
        subtitle: 'Upcoming home visits',
        route: 'MyBookings'
      }
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', title: 'Help Center', subtitle: 'Get help with bookings' }
    ]
  }
];

const MenuItem = ({ item, onPress }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
  >
    <View style={styles.menuIcon}>
      <Ionicons color="#11172b" name={item.icon} size={21} />
    </View>
    <View style={styles.menuCopy}>
      <Text style={styles.menuTitle}>{item.title}</Text>
      {item.subtitle ? <Text style={styles.menuSubtitle}>{item.subtitle}</Text> : null}
    </View>
    {item.value ? <Text style={styles.menuValue}>{item.value}</Text> : null}
    <Ionicons color="#94a3b8" name="chevron-forward" size={19} />
  </Pressable>
);

const CustomerProfileScreen = ({ navigation }) => {
  const { loading, logout, saveProfileImage, user } = useAuth();
  const { showToast, toastProps } = useToast();

  const pickProfileImage = async () => {
    if (loading) {
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      showToast('Allow gallery access to update your profile photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.82
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    try {
      await saveProfileImage(result.assets[0]);
      showToast('Profile photo updated.', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to update your profile photo.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Do you want to log out from Home Guard?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: logout
      }
    ]);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ToastMessage {...toastProps} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Ionicons color="#11172b" name="chevron-back" size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Update profile photo"
          onPress={pickProfileImage}
          style={({ pressed }) => [styles.identityCard, pressed && styles.pressed]}
        >
          <View style={styles.avatar}>
            {user?.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{getInitials(user?.name) || 'HG'}</Text>
            )}
            <View style={styles.cameraBadge}>
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Ionicons color="#ffffff" name="camera" size={15} />
              )}
            </View>
          </View>
          <View style={styles.identityCopy}>
            <Text numberOfLines={1} style={styles.name}>{user?.name || 'Customer'}</Text>
            <Text numberOfLines={1} style={styles.email}>{user?.email || 'customer@homeguard.lk'}</Text>
          </View>
        </Pressable>

        {menuSections.map((section) => (
          <View key={section.title} style={styles.sectionGroup}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <View key={item.title}>
                  <MenuItem
                    item={item}
                    onPress={() => {
                      if (item.action === 'profileImage') {
                        pickProfileImage();
                        return;
                      }

                      if (item.route) {
                        navigation.navigate(item.route);
                      }
                    }}
                  />
                  {index < section.items.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              ))}
            </View>
          </View>
        ))}

        <Pressable
          accessibilityRole="button"
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fb'
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 18
  },
  header: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#ffffff'
  },
  headerTitle: {
    color: '#11172b',
    fontSize: 18,
    fontWeight: '900'
  },
  headerSpacer: {
    width: 42
  },
  identityCard: {
    minHeight: 102,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 28,
    padding: 18,
    backgroundColor: '#ffffff',
    shadowColor: '#11172b',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3
  },
  avatar: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#ff5b0a'
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900'
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 12,
    backgroundColor: '#11172b'
  },
  identityCopy: {
    flex: 1
  },
  name: {
    color: '#11172b',
    fontSize: 20,
    fontWeight: '900'
  },
  email: {
    marginTop: 5,
    color: '#64748b',
    fontSize: 14,
    fontWeight: '800'
  },
  sectionGroup: {
    gap: 10
  },
  sectionLabel: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '900'
  },
  menuCard: {
    overflow: 'hidden',
    borderRadius: 26,
    backgroundColor: '#ffffff',
    shadowColor: '#11172b',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2
  },
  menuItem: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff'
  },
  menuIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 17,
    backgroundColor: '#f8fafc'
  },
  menuCopy: {
    flex: 1
  },
  menuTitle: {
    color: '#11172b',
    fontSize: 15,
    fontWeight: '900'
  },
  menuSubtitle: {
    marginTop: 3,
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700'
  },
  menuValue: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '800'
  },
  divider: {
    height: 1,
    marginLeft: 63,
    backgroundColor: '#f1f5f9'
  },
  logoutButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    backgroundColor: '#fee2e2'
  },
  logoutText: {
    color: '#b91c1c',
    fontSize: 15,
    fontWeight: '900'
  },
  pressed: {
    opacity: 0.82
  }
});

export default CustomerProfileScreen;
