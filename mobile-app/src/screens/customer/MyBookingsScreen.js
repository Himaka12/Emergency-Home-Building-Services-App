import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { getMyBookings } from '../../api/bookingApi';
import ScreenContainer from '../common/ScreenContainer';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings()
      .then((response) => setBookings(response.data))
      .catch(() => setBookings([]));
  }, []);

  return (
    <ScreenContainer>
      <Text>My Bookings</Text>
      {bookings.map((booking) => (
        <Text key={booking._id}>{booking.status}</Text>
      ))}
    </ScreenContainer>
  );
};

export default MyBookingsScreen;
