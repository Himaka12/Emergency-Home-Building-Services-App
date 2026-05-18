import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { getMyWorkerProfile, saveWorkerProfile } from '../../api/workerApi';
import { useAuth } from '../../context/AuthContext';

const initialForm = {
  fullName: '',
  profileImage: '',
  phone: '',
  email: '',
  nicNumber: '',
  dateOfBirth: '',
  gender: '',
  currentAddress: '',
  city: '',
  district: '',
  serviceAreas: '',
  workerRole: '',
  yearsOfExperience: '',
  shortBio: '',
  languagesSpoken: '',
  availableWorkingDays: '',
  availableWorkingHours: '',
  nicFrontImage: '',
  nicBackImage: '',
  selfieImage: '',
  policeClearanceUpload: '',
  tradeLicenseUpload: '',
  password: '',
  bankAccountDetails: '',
  paymentMethod: '',
  emergencyContactNumber: '',
  availabilityStatus: 'available',
  notificationPreferences: 'SMS, Email, Push'
};

const splitCommaList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const joinList = (value) => (Array.isArray(value) ? value.join(', ') : '');

const currentYear = new Date().getFullYear();
const WHEEL_ITEM_HEIGHT = 44;
const WHEEL_VISIBLE_ITEMS = 5;
const years = Array.from({ length: 83 }, (_, index) => String(currentYear - 18 - index));
const yearOptions = years.map((year) => ({ label: year, value: year }));
const months = [
  { label: 'Jan', value: '01' },
  { label: 'Feb', value: '02' },
  { label: 'Mar', value: '03' },
  { label: 'Apr', value: '04' },
  { label: 'May', value: '05' },
  { label: 'Jun', value: '06' },
  { label: 'Jul', value: '07' },
  { label: 'Aug', value: '08' },
  { label: 'Sep', value: '09' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' }
];
const days = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));
const dayOptions = days.map((day) => ({ label: day, value: day }));

const getInitialBirthDate = (value) => {
  const [year, month, day] = value?.split('-') || [];

  return {
    year: years.includes(year) ? year : years[20],
    month: months.some((item) => item.value === month) ? month : '01',
    day: days.includes(day) ? day : '01'
  };
};

const calculateAge = ({ year, month, day }) => {
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
};

const WheelPicker = ({ data, label, onChange, selectedValue }) => {
  const selectedIndex = Math.max(
    0,
    data.findIndex((item) => item.value === selectedValue)
  );

  const handleMomentumEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / WHEEL_ITEM_HEIGHT);
    const item = data[Math.min(Math.max(index, 0), data.length - 1)];

    if (item) {
      onChange(item.value);
    }
  };

  return (
    <View style={styles.wheelColumn}>
      <Text style={styles.wheelLabel}>{label}</Text>
      <View style={styles.wheelFrame}>
        <View pointerEvents="none" style={styles.wheelSelectionFrame} />
        <FlatList
          data={data}
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: WHEEL_ITEM_HEIGHT,
            offset: WHEEL_ITEM_HEIGHT * index,
            index
          })}
          initialScrollIndex={selectedIndex}
          keyExtractor={(item) => item.value}
          nestedScrollEnabled
          onMomentumScrollEnd={handleMomentumEnd}
          renderItem={({ item }) => {
            const isSelected = item.value === selectedValue;

            return (
              <View style={styles.wheelOption}>
                <Text style={[styles.wheelText, isSelected && styles.selectedWheelText]}>
                  {item.label}
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={WHEEL_ITEM_HEIGHT}
          style={styles.wheel}
          contentContainerStyle={styles.wheelContent}
        />
      </View>
    </View>
  );
};

const Field = ({
  autoCapitalize,
  keyboardType,
  label,
  multiline = false,
  onChangeText,
  placeholder,
  secureTextEntry,
  value
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      multiline={multiline}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      secureTextEntry={secureTextEntry}
      style={[styles.input, multiline && styles.textArea]}
      textAlignVertical={multiline ? 'top' : 'center'}
      value={value}
    />
  </View>
);

const Section = ({ children, title }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const WorkerProfileScreen = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    ...initialForm,
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [birthPickerVisible, setBirthPickerVisible] = useState(false);
  const [birthSelection, setBirthSelection] = useState(getInitialBirthDate(''));

  useEffect(() => {
    getMyWorkerProfile()
      .then((response) => {
        const profile = response.data;

        setForm((current) => ({
          ...current,
          fullName: profile.fullName || profile.userId?.name || current.fullName,
          profileImage: profile.profileImage || '',
          phone: profile.phone || profile.userId?.phone || current.phone,
          email: profile.email || profile.userId?.email || current.email,
          nicNumber: profile.nicNumber || '',
          dateOfBirth: profile.dateOfBirth || '',
          gender: profile.gender || '',
          currentAddress: profile.currentAddress || '',
          city: profile.city || '',
          district: profile.district || '',
          serviceAreas: joinList(profile.serviceAreas),
          workerRole: profile.workerRole || '',
          yearsOfExperience: String(profile.yearsOfExperience || ''),
          shortBio: profile.shortBio || profile.experience || '',
          languagesSpoken: joinList(profile.languagesSpoken),
          availableWorkingDays: joinList(profile.availableWorkingDays),
          availableWorkingHours: profile.availableWorkingHours || '',
          nicFrontImage: profile.nicFrontImage || '',
          nicBackImage: profile.nicBackImage || '',
          selfieImage: profile.selfieImage || '',
          policeClearanceUpload: profile.policeClearanceUpload || '',
          tradeLicenseUpload: profile.tradeLicenseUpload || '',
          bankAccountDetails: profile.bankAccountDetails || '',
          paymentMethod: profile.paymentMethod || '',
          emergencyContactNumber: profile.emergencyContactNumber || '',
          availabilityStatus: profile.availabilityStatus || 'available',
          notificationPreferences: Object.entries(profile.notificationPreferences || {})
            .filter(([, enabled]) => enabled)
            .map(([name]) => name.toUpperCase())
            .join(', ') || 'SMS, Email, Push'
        }));
      })
      .catch(() => {
        setForm((current) => current);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updateDigits = (name, value, maxLength) => {
    updateField(name, value.replace(/\D/g, '').slice(0, maxLength));
  };

  const openBirthPicker = () => {
    setBirthSelection(getInitialBirthDate(form.dateOfBirth));
    setBirthPickerVisible(true);
  };

  const updateBirthSelection = (name, value) => {
    setBirthSelection((current) => ({ ...current, [name]: value }));
  };

  const applyBirthDate = () => {
    updateField('dateOfBirth', `${birthSelection.year}-${birthSelection.month}-${birthSelection.day}`);
    setBirthPickerVisible(false);
  };

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Allow gallery access to select a profile photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      updateField('profileImage', result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      ['fullName', 'Full name is required.'],
      ['phone', 'Phone number is required.'],
      ['email', 'Email address is required.'],
      ['nicNumber', 'NIC / ID number is required.'],
      ['currentAddress', 'Current address is required.'],
      ['city', 'City is required.'],
      ['district', 'District is required.'],
      ['serviceAreas', 'Service areas are required.'],
      ['workerRole', 'Worker role is required.'],
      ['yearsOfExperience', 'Years of experience is required.'],
      ['shortBio', 'Short bio is required.'],
      ['availableWorkingDays', 'Available working days are required.'],
      ['availableWorkingHours', 'Available working hours are required.'],
      ['nicFrontImage', 'NIC front image reference is required.'],
      ['nicBackImage', 'NIC back image reference is required.'],
      ['selfieImage', 'Selfie verification photo reference is required.'],
      ['emergencyContactNumber', 'Emergency contact number is required.']
    ];
    const missing = requiredFields.find(([name]) => !form[name].trim());

    if (missing) {
      return missing[1];
    }

    if (!form.email.includes('@')) {
      return 'Email address must contain @.';
    }

    if (form.phone.length !== 10) {
      return 'Mobile number must be exactly 10 digits.';
    }

    if (form.emergencyContactNumber.length !== 10) {
      return 'Emergency contact number must be exactly 10 digits.';
    }

    if (form.password && form.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    return '';
  };

  const handleSave = async () => {
    if (saving) {
      return;
    }

    const validationMessage = validateForm();

    if (validationMessage) {
      Alert.alert('Missing details', validationMessage);
      return;
    }

    try {
      setSaving(true);
      await saveWorkerProfile({
        fullName: form.fullName.trim(),
        profileImage: form.profileImage.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        nicNumber: form.nicNumber.trim(),
        dateOfBirth: form.dateOfBirth.trim(),
        gender: form.gender.trim().toLowerCase(),
        currentAddress: form.currentAddress.trim(),
        city: form.city.trim(),
        district: form.district.trim(),
        workerRole: form.workerRole.trim(),
        yearsOfExperience: Number(form.yearsOfExperience) || 0,
        shortBio: form.shortBio.trim(),
        languagesSpoken: splitCommaList(form.languagesSpoken),
        availableWorkingDays: splitCommaList(form.availableWorkingDays),
        availableWorkingHours: form.availableWorkingHours.trim(),
        experience: form.shortBio.trim(),
        serviceAreas: splitCommaList(form.serviceAreas),
        nicFrontImage: form.nicFrontImage.trim(),
        nicBackImage: form.nicBackImage.trim(),
        selfieImage: form.selfieImage.trim(),
        policeClearanceUpload: form.policeClearanceUpload.trim(),
        tradeLicenseUpload: form.tradeLicenseUpload.trim(),
        documents: [
          form.nicFrontImage.trim(),
          form.nicBackImage.trim(),
          form.selfieImage.trim(),
          form.policeClearanceUpload.trim(),
          form.tradeLicenseUpload.trim()
        ].filter(Boolean),
        bankAccountDetails: form.bankAccountDetails.trim(),
        paymentMethod: form.paymentMethod.trim(),
        emergencyContactNumber: form.emergencyContactNumber.trim(),
        availabilityStatus: form.availabilityStatus.trim().toLowerCase() || 'available',
        password: form.password,
        notificationPreferences: {
          sms: form.notificationPreferences.toLowerCase().includes('sms'),
          email: form.notificationPreferences.toLowerCase().includes('email'),
          push: form.notificationPreferences.toLowerCase().includes('push')
        }
      });

      Alert.alert('Profile saved', 'Common worker profile information was submitted for review.');
    } catch (error) {
      Alert.alert('Save failed', error.response?.data?.message || 'Unable to save worker profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color="#ff5b0a" />
        <Text style={styles.loadingText}>Loading worker profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Common profile</Text>
          <Text style={styles.title}>Worker Profile</Text>
          <Text style={styles.subtitle}>These details are shared across every worker role.</Text>
        </View>

        <Section title="Basic Information">
          <Field label="Full Name" value={form.fullName} onChangeText={(value) => updateField('fullName', value)} />
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Profile Photo</Text>
            <Pressable
              accessibilityRole="button"
              onPress={pickProfileImage}
              style={({ pressed }) => [styles.photoPicker, pressed && styles.pressed]}
            >
              {form.profileImage ? (
                <Image source={{ uri: form.profileImage }} style={styles.profilePreview} />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.profilePlaceholderText}>+</Text>
                </View>
              )}
              <View style={styles.photoPickerTextGroup}>
                <Text style={styles.photoPickerTitle}>
                  {form.profileImage ? 'Change profile photo' : 'Choose from gallery'}
                </Text>
                <Text style={styles.photoPickerText}>Select a clear face photo from your device.</Text>
              </View>
            </Pressable>
          </View>
          <Field label="Phone Number" keyboardType="phone-pad" value={form.phone} onChangeText={(value) => updateDigits('phone', value, 10)} />
          <Field label="Email Address" autoCapitalize="none" keyboardType="email-address" value={form.email} onChangeText={(value) => updateField('email', value)} />
          <Field label="NIC / ID Number" autoCapitalize="characters" value={form.nicNumber} onChangeText={(value) => updateField('nicNumber', value)} />
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <Pressable
              accessibilityRole="button"
              onPress={openBirthPicker}
              style={({ pressed }) => [styles.datePickerButton, pressed && styles.pressed]}
            >
              <Text style={[styles.datePickerText, !form.dateOfBirth && styles.placeholderText]}>
                {form.dateOfBirth || 'Select year, month, and day'}
              </Text>
              <Text style={styles.datePickerHint}>Scroll</Text>
            </Pressable>
          </View>
          <Field label="Gender" value={form.gender} onChangeText={(value) => updateField('gender', value)} placeholder="male, female, other, prefer_not_to_say" />
        </Section>

        <Section title="Location Information">
          <Field label="Current Address" multiline value={form.currentAddress} onChangeText={(value) => updateField('currentAddress', value)} />
          <Field label="City" value={form.city} onChangeText={(value) => updateField('city', value)} />
          <Field label="District" value={form.district} onChangeText={(value) => updateField('district', value)} />
          <Field label="Service Area / Working Locations" value={form.serviceAreas} onChangeText={(value) => updateField('serviceAreas', value)} placeholder="Colombo, Nugegoda, Maharagama" />
        </Section>

        <Section title="Work Information">
          <Field label="Worker Role" value={form.workerRole} onChangeText={(value) => updateField('workerRole', value)} placeholder="Electrician, Plumber, Cleaner" />
          <Field label="Years of Experience" keyboardType="number-pad" value={form.yearsOfExperience} onChangeText={(value) => updateDigits('yearsOfExperience', value, 2)} />
          <Field label="Short Bio / Description" multiline value={form.shortBio} onChangeText={(value) => updateField('shortBio', value)} />
          <Field label="Languages Spoken" value={form.languagesSpoken} onChangeText={(value) => updateField('languagesSpoken', value)} placeholder="Sinhala, Tamil, English" />
          <Field label="Available Working Days" value={form.availableWorkingDays} onChangeText={(value) => updateField('availableWorkingDays', value)} placeholder="Monday, Tuesday, Friday" />
          <Field label="Available Working Hours" value={form.availableWorkingHours} onChangeText={(value) => updateField('availableWorkingHours', value)} placeholder="8 AM - 6 PM" />
        </Section>

        <Section title="Verification Information">
          <Field label="NIC Front Image" value={form.nicFrontImage} onChangeText={(value) => updateField('nicFrontImage', value)} placeholder="Image URL or file reference" />
          <Field label="NIC Back Image" value={form.nicBackImage} onChangeText={(value) => updateField('nicBackImage', value)} placeholder="Image URL or file reference" />
          <Field label="Selfie / Face Verification Photo" value={form.selfieImage} onChangeText={(value) => updateField('selfieImage', value)} placeholder="Image URL or file reference" />
          <Field label="Police Clearance Upload (optional)" value={form.policeClearanceUpload} onChangeText={(value) => updateField('policeClearanceUpload', value)} placeholder="File reference" />
          <Field label="Trade License / Certification Upload (optional)" value={form.tradeLicenseUpload} onChangeText={(value) => updateField('tradeLicenseUpload', value)} placeholder="File reference" />
        </Section>

        <Section title="Account Information">
          <Field label="Password" secureTextEntry value={form.password} onChangeText={(value) => updateField('password', value)} placeholder="Only enter if changing password" />
          <Field label="Bank Account Details or Payment Method" multiline value={form.bankAccountDetails} onChangeText={(value) => updateField('bankAccountDetails', value)} />
          <Field label="Payment Method" value={form.paymentMethod} onChangeText={(value) => updateField('paymentMethod', value)} placeholder="Bank transfer, cash, wallet" />
          <Field label="Emergency Contact Number" keyboardType="phone-pad" value={form.emergencyContactNumber} onChangeText={(value) => updateDigits('emergencyContactNumber', value, 10)} />
        </Section>

        <Section title="Status & Settings">
          <Field label="Verification Status" value="Pending admin review" onChangeText={() => {}} />
          <Field label="Availability Status" value={form.availabilityStatus} onChangeText={(value) => updateField('availabilityStatus', value.toLowerCase())} placeholder="available, busy, offline" />
          <Field label="Notification Preferences" value={form.notificationPreferences} onChangeText={(value) => updateField('notificationPreferences', value)} placeholder="SMS, Email, Push" />
        </Section>

        <Section title="Ratings & Work History">
          <View style={styles.readOnlyGrid}>
            <Text style={styles.readOnlyText}>Customer Ratings: 0</Text>
            <Text style={styles.readOnlyText}>Reviews: No reviews yet</Text>
            <Text style={styles.readOnlyText}>Completed Jobs Count: 0</Text>
          </View>
        </Section>

        <Pressable
          accessibilityRole="button"
          disabled={saving}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.pressed,
            saving && styles.disabledButton
          ]}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitText}>Save Common Profile</Text>
          )}
        </Pressable>
      </ScrollView>

      <Modal transparent animationType="fade" visible={birthPickerVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.birthSheet}>
            <View style={styles.birthHeader}>
              <View>
                <Text style={styles.birthTitle}>Date of Birth</Text>
                <Text style={styles.birthSubtitle}>Age {calculateAge(birthSelection)} years</Text>
              </View>
              <Pressable onPress={() => setBirthPickerVisible(false)} hitSlop={10}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>

            <View style={styles.wheelRow}>
              <WheelPicker
                data={yearOptions}
                label="Year"
                onChange={(value) => updateBirthSelection('year', value)}
                selectedValue={birthSelection.year}
              />
              <WheelPicker
                data={months}
                label="Month"
                onChange={(value) => updateBirthSelection('month', value)}
                selectedValue={birthSelection.month}
              />
              <WheelPicker
                data={dayOptions}
                label="Day"
                onChange={(value) => updateBirthSelection('day', value)}
                selectedValue={birthSelection.day}
              />
            </View>

            <Pressable onPress={applyBirthDate} style={styles.applyDateButton}>
              <Text style={styles.applyDateText}>Apply Date</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fb'
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f6f8fb'
  },
  loadingText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '800'
  },
  content: {
    padding: 18,
    paddingBottom: 30,
    gap: 16
  },
  header: {
    gap: 6
  },
  eyebrow: {
    color: '#f05a0a',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  title: {
    color: '#11172b',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31
  },
  subtitle: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20
  },
  section: {
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#ffffff'
  },
  sectionTitle: {
    color: '#11172b',
    fontSize: 16,
    fontWeight: '900'
  },
  fieldGroup: {
    gap: 8
  },
  label: {
    color: '#11172b',
    fontSize: 13,
    fontWeight: '900'
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#dbe2ec',
    borderRadius: 8,
    paddingHorizontal: 13,
    color: '#11172b',
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#ffffff'
  },
  photoPicker: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#dbe2ec',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff'
  },
  profilePreview: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#e2e8f0'
  },
  profilePlaceholder: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    backgroundColor: '#fff8f4',
    borderWidth: 1,
    borderColor: '#f1e2da'
  },
  profilePlaceholderText: {
    color: '#f05a0a',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32
  },
  photoPickerTextGroup: {
    flex: 1
  },
  photoPickerTitle: {
    color: '#11172b',
    fontSize: 14,
    fontWeight: '900'
  },
  photoPickerText: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16
  },
  datePickerButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#dbe2ec',
    borderRadius: 8,
    paddingHorizontal: 13,
    backgroundColor: '#ffffff'
  },
  datePickerText: {
    color: '#11172b',
    fontSize: 14,
    fontWeight: '800'
  },
  placeholderText: {
    color: '#94a3b8'
  },
  datePickerHint: {
    color: '#f05a0a',
    fontSize: 12,
    fontWeight: '900'
  },
  textArea: {
    minHeight: 96,
    paddingTop: 12
  },
  readOnlyGrid: {
    gap: 8
  },
  readOnlyText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '800'
  },
  submitButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ff5b0a',
    shadowColor: '#ff5b0a',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 12,
    elevation: 4
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900'
  },
  pressed: {
    opacity: 0.84
  },
  disabledButton: {
    opacity: 0.72
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(17, 23, 43, 0.35)'
  },
  birthSheet: {
    gap: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
    paddingBottom: 28,
    backgroundColor: '#ffffff'
  },
  birthHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  },
  birthTitle: {
    color: '#11172b',
    fontSize: 19,
    fontWeight: '900'
  },
  birthSubtitle: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 13,
    fontWeight: '800'
  },
  cancelText: {
    color: '#f05a0a',
    fontSize: 13,
    fontWeight: '900'
  },
  wheelRow: {
    flexDirection: 'row',
    gap: 10
  },
  wheelColumn: {
    flex: 1,
    gap: 8
  },
  wheelLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center'
  },
  wheel: {
    height: 176
  },
  wheelFrame: {
    position: 'relative',
    height: WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_ITEMS,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff'
  },
  wheelSelectionFrame: {
    position: 'absolute',
    top: WHEEL_ITEM_HEIGHT * 2,
    left: 8,
    right: 8,
    height: WHEEL_ITEM_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#fff3e8'
  },
  wheelContent: {
    paddingVertical: WHEEL_ITEM_HEIGHT * 2
  },
  wheelOption: {
    height: WHEEL_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  selectedWheelOption: {
    backgroundColor: '#fff3e8'
  },
  wheelText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '800'
  },
  selectedWheelText: {
    color: '#f05a0a',
    fontSize: 17,
    fontWeight: '900'
  },
  applyDateButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ff5b0a'
  },
  applyDateText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900'
  }
});

export default WorkerProfileScreen;
