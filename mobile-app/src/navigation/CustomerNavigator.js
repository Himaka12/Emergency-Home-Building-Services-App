import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingDetailsScreen from '../screens/customer/BookingDetailsScreen';
import CreateBookingScreen from '../screens/customer/CreateBookingScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';
import ManageProfileScreen from '../screens/customer/ManageProfileScreen';
import MyBookingsScreen from '../screens/customer/MyBookingsScreen';
import RateWorkerScreen from '../screens/customer/RateWorkerScreen';
import ServiceCategoriesScreen from '../screens/customer/ServiceCategoriesScreen';

const Stack = createNativeStackNavigator();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#f6f8fb' }
      }}
    >
      <Stack.Screen
        name="ServiceCategories"
        component={ServiceCategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageProfile"
        component={ManageProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateBooking" component={CreateBookingScreen} />
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
      <Stack.Screen name="RateWorker" component={RateWorkerScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
