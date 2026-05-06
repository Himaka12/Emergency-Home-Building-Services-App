import { ROLES } from '../constants/roles';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import WorkerNavigator from './WorkerNavigator';

const AppNavigator = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  if (user?.role === ROLES.WORKER) {
    return <WorkerNavigator />;
  }

  return <CustomerNavigator />;
};

export default AppNavigator;
