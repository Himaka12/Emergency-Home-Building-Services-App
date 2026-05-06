import { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { getAssignedJobs } from '../../api/bookingApi';
import { useAuth } from '../../context/AuthContext';
import ScreenContainer from '../common/ScreenContainer';

const AssignedJobsScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAssignedJobs()
      .then((response) => setJobs(response.data))
      .catch(() => setJobs([]));
  }, []);

  return (
    <ScreenContainer>
      <Text>Assigned Jobs</Text>
      {jobs.map((job) => (
        <Text key={job._id}>{job.status}</Text>
      ))}
      <Button title="Worker profile" onPress={() => navigation.navigate('WorkerProfile')} />
      <Button title="Job history" onPress={() => navigation.navigate('JobHistory')} />
      <Button title="Logout" onPress={logout} />
    </ScreenContainer>
  );
};

export default AssignedJobsScreen;
