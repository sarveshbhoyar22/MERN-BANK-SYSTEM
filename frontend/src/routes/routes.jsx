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
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import loading from "../components/loading.jsx";
import CheckBalance from "../pages/CheckBalance.jsx";
import Layout from "../layouts/layout.jsx";
import ScrollToTop from "../utils/ScrollToTop.jsx";
import Contact from "../pages/Contact.jsx";
import Blog from "../pages/Blog.jsx";




// Protected route component
const PrivateRoute = ({ element, allowedRoles }) => {
  const { authUser: user } = useAuth();
  // console.log("routeUser:",user);
  

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const AppRoutes = () => {
  const { authUser: user, loading } = useAuth();

    if (loading) {
      <loading/>// Show loading screen while checking auth state
    }
  return (
    <Router>
      {/* <Navbar /> */}
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          

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
              <PrivateRoute
                element={user ? <Deposit /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute
                element={user ? <Withdraw /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/transfer"
            element={
              <PrivateRoute
                element={user ? <Transfer /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute
                element={user ? <Transactions /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
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
          <Route
            path="/checkBalance"
            element={
              <PrivateRoute
                element={user ? <CheckBalance /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute
                element={user ? <Transactions /> : <Navigate to="/login" />}
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
              <PrivateRoute
                element={user ? <AdminUsers /> : <Navigate to="/login" />}
                allowedRoles={["admin"]}
              />
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
