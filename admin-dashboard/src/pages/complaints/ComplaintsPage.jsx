import { useEffect, useState } from 'react';
import { getComplaints } from '../../api/complaintApi.js';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getComplaints()
      .then((response) => setComplaints(response.data))
      .catch(() => setComplaints([]));
  }, []);

  return (
    <>
      <header className="page-header">
        <h2>Complaints</h2>
      </header>
      <section className="page-panel table-shell">
        <table>
          <thead>
            <tr>
              <th>Reason</th>
              <th>Reported By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.reason}</td>
                <td>{complaint.reportedBy?.name}</td>
                <td>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ComplaintsPage;
