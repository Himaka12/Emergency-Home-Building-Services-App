import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssignedJobsScreen from '../screens/worker/AssignedJobsScreen';
import JobHistoryScreen from '../screens/worker/JobHistoryScreen';
import WorkerProfileScreen from '../screens/worker/WorkerProfileScreen';

const Stack = createNativeStackNavigator();

const WorkerNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AssignedJobs" component={AssignedJobsScreen} />
      <Stack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
      <Stack.Screen name="JobHistory" component={JobHistoryScreen} />
    </Stack.Navigator>
  );
};

export default WorkerNavigator;
