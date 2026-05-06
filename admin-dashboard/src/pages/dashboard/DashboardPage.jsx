import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../../api/adminApi.js';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getDashboardSummary()
      .then((response) => setSummary(response.data))
      .catch(() => setSummary(null));
  }, []);

  const items = [
    ['Customers', summary?.customers ?? '-'],
    ['Workers', summary?.workers ?? '-'],
    ['Pending Workers', summary?.pendingWorkers ?? '-'],
    ['Bookings', summary?.bookings ?? '-'],
    ['Pending Bookings', summary?.pendingBookings ?? '-'],
    ['Services', summary?.services ?? '-']
  ];

  return (
    <>
      <header className="page-header">
        <h2>Dashboard</h2>
      </header>
      <section className="summary-grid">
        {items.map(([label, value]) => (
          <article className="summary-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
    </>
  );
};

export default DashboardPage;
