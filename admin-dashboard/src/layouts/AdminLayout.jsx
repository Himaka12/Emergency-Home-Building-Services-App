import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <h1>Service Provider Admin</h1>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
          <NavLink to="/workers">Workers</NavLink>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/complaints">Complaints</NavLink>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
