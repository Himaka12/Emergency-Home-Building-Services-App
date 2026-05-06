import { ROLES } from '../constants/roles';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import WorkerNavigator from './WorkerNavigator';

const AppNavigator = () => {
  const { initializing, isAuthenticated, user } = useAuth();

  if (initializing) {
    return null;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  if (user?.role === ROLES.WORKER) {
    return <WorkerNavigator />;
  }

  return <CustomerNavigator />;
};

export default AppNavigator;
