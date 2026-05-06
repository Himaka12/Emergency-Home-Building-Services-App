import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingDetailsScreen from '../screens/customer/BookingDetailsScreen';
import CreateBookingScreen from '../screens/customer/CreateBookingScreen';
import MyBookingsScreen from '../screens/customer/MyBookingsScreen';
import RateWorkerScreen from '../screens/customer/RateWorkerScreen';
import ServiceCategoriesScreen from '../screens/customer/ServiceCategoriesScreen';

const Stack = createNativeStackNavigator();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ServiceCategories" component={ServiceCategoriesScreen} />
      <Stack.Screen name="CreateBooking" component={CreateBookingScreen} />
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
      <Stack.Screen name="RateWorker" component={RateWorkerScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
