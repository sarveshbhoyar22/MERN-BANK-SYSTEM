import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Auth context for checking user roles

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Deposit from "../pages/AccountManagementPages/Deposit";
import Withdraw from "../pages/AccountManagementPages/Withdraw";
import Transfer from "../pages/AccountManagementPages/Transfer";
import Transactions from "../pages/AccountManagementPages/Transactions";
import Profile from "../pages/UserProfile";
import AdminUsers from "../pages/AdminUserManagement";
import NotFound from "../pages/Error";
import Home from "../pages/Home";

// Protected route component
const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth(); // Get user data from context

  if (!user) {
    return <Navigate to="/Home" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/Home"
          element={
            <PrivateRoute
              element={<Home/>}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        <Route
          path="/deposit"
          element={
            <PrivateRoute element={<Deposit />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/withdraw"
          element={
            <PrivateRoute element={<Withdraw />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute element={<Transfer />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute element={<Transactions />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={<Profile />}
              allowedRoles={["user", "admin"]}
            />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute element={<AdminUsers />} allowedRoles={["admin"]} />
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
