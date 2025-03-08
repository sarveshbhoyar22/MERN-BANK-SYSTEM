import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {useAuthContext as useAuth} from "../context/AuthContext.jsx";// Auth context for checking user roles

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Deposit from "../pages/AccountManagementPages/DepositMoney.jsx";
import Withdraw from "../pages/AccountManagementPages/WithdrawMoney.jsx";
import Transfer from "../pages/AccountManagementPages/TransferMoney.jsx";
import Transactions from "../pages/AccountManagementPages/Transaction.jsx";
import Profile from "../pages/UserProfile.jsx";
import AdminUsers from "../pages/AdminUserManagement.jsx";
import NotFound from "../pages/Error.jsx";
import Home from "../pages/Home.jsx";

// Protected route component
const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home/>} />

        {/* User Routes */}
       
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={user ? <Dashboard /> : <Navigate to="/login" />}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        <Route
          path="/deposit"
          element={
            <PrivateRoute element={user ? <Deposit /> : <Navigate to="/login" />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/withdraw"
          element={
            <PrivateRoute element={user ? <Withdraw /> : <Navigate to="/login" />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute element={user ? <Transfer /> : <Navigate to="/login" />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute element={user ? <Transactions /> : <Navigate to="/login" />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={user ? <Profile /> : <Navigate to="/login" />}
              allowedRoles={["user", "admin"]}
            />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={user ? <AdminDashboard /> : <Navigate to="/login" />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute element={user ? <AdminUsers />: <Navigate to="/login" />} allowedRoles={["admin"]} />
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
