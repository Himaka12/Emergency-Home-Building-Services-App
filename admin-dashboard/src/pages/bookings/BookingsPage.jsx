import { useEffect, useState } from 'react';
import { getBookings } from '../../api/adminApi.js';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings()
      .then((response) => setBookings(response.data))
      .catch(() => setBookings([]));
  }, []);

  return (
    <>
      <header className="page-header">
        <h2>Bookings</h2>
      </header>
      <section className="page-panel table-shell">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Customer</th>
              <th>Worker</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.serviceCategoryId?.name}</td>
                <td>{booking.customerId?.name}</td>
                <td>{booking.workerId?.name || 'Not assigned'}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default BookingsPage;
