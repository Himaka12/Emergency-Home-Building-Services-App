import { useEffect, useState } from 'react';
import { getWorkers, updateWorkerApproval } from '../../api/adminApi.js';

const WorkersPage = () => {
  const [workers, setWorkers] = useState([]);

  const loadWorkers = () => {
    getWorkers()
      .then((response) => setWorkers(response.data))
      .catch(() => setWorkers([]));
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const handleApproval = async (profileId, approvalStatus) => {
    await updateWorkerApproval(profileId, approvalStatus);
    loadWorkers();
  };

  return (
    <>
      <header className="page-header">
        <h2>Workers</h2>
      </header>
      <section className="page-panel table-shell">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Services</th>
              <th>Availability</th>
              <th>Approval</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((profile) => (
              <tr key={profile._id}>
                <td>{profile.userId?.name}</td>
                <td>{profile.services?.map((service) => service.name).join(', ')}</td>
                <td>{profile.availabilityStatus}</td>
                <td>{profile.approvalStatus}</td>
                <td>
                  <button
                    className="button"
                    type="button"
                    onClick={() => handleApproval(profile._id, 'approved')}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default WorkersPage;
