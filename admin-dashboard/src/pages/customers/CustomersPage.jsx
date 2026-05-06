import { useEffect, useState } from 'react';
import { getCustomers } from '../../api/adminApi.js';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers()
      .then((response) => setCustomers(response.data))
      .catch(() => setCustomers([]));
  }, []);

  return (
    <>
      <header className="page-header">
        <h2>Customers</h2>
      </header>
      <section className="page-panel table-shell">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.isActive ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default CustomersPage;
