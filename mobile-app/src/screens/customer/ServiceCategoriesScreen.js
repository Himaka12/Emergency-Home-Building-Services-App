import { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { getServiceCategories } from '../../api/serviceApi';
import { useAuth } from '../../context/AuthContext';
import ScreenContainer from '../common/ScreenContainer';

const ServiceCategoriesScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServiceCategories()
      .then((response) => setServices(response.data))
      .catch(() => setServices([]));
  }, []);

  return (
    <ScreenContainer>
      <Text>Service Categories</Text>
      {services.map((service) => (
        <Text key={service._id}>{service.name}</Text>
      ))}
      <Button title="Create booking" onPress={() => navigation.navigate('CreateBooking')} />
      <Button title="My bookings" onPress={() => navigation.navigate('MyBookings')} />
      <Button title="Logout" onPress={logout} />
    </ScreenContainer>
  );
};

export default ServiceCategoriesScreen;
