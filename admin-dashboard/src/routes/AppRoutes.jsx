import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import BookingsPage from '../pages/bookings/BookingsPage.jsx';
import ComplaintsPage from '../pages/complaints/ComplaintsPage.jsx';
import CustomersPage from '../pages/customers/CustomersPage.jsx';
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';
import ServicesPage from '../pages/services/ServicesPage.jsx';
import WorkersPage from '../pages/workers/WorkersPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
