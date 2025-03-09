import React, { use } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import UseLogout from '../hooks/UseLogout';
import useScreenSize from '../hooks/Usescreensize';
import { useNotificationContext } from '../context/NotificationContext';
import NotificationDropdown from './NotificationDropdown';

const Navbar = ({ profilePhoto = "/logo.png" }) => {
  // const {notifications, markedAsRead} = useNotificationContext();
  // const [open, setOpen] = useState(false);
  const { authUser: user } = useAuthContext();
  const { logout, loading } = UseLogout();
  const {width} = useScreenSize();
 

  return (
    <>
      <div className="navbar  text-white shadow-sm absolute fixed z-10 ">
        {width < 768 ? (
          <div className="navbar-start dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <div className='mt-10 -ml-8'>

            <ul
              tabIndex={0}
              className="menu menu-lg gap-4 dropdown-content bg-base-100 rounded-box z-1 mt- w-52 p-2 shadow"
              >
              <Link to="/">Home</Link>
              <Link to="/about">About us</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </ul>
              </div>
          </div>
        ) : (
          <div className="navbar-start -mr-1  ">
            <div>
              <Link
                to="/dashboard"
                role="button"
                draggable="false"
                className="btn btn-ghost normal-case text-md"
              >
                Home
                {/* dashboard */}
              </Link>
              <Link
                to="/about"
                role="button"
                draggable="false"
                className=" dropdown btn btn-ghost normal-case text-md"
              >
                About us
              </Link>
              <Link
                to="/about"
                role="button"
                draggable="false"
                className="btn btn-ghost normal-case text-md"
              >
                Blog
              </Link>
              <Link
                to="/about"
                role="button"
                draggable="false"
                className="btn btn-ghost normal-case text-md"
              >
                Contact
              </Link>
            </div>
          </div>
        )}

        {user && (
          <div className="navbar-center">
            <Link
              to="/dashboard"
              role="button"
              draggable="false"
              className="btn btn-ghost normal-case sm:text-2xl text-xl"
            >
              OnlineAuth-BANK
            </Link>
            {/* <a className="btn btn-ghost text-xl">Auth-Bank</a> */}
          </div>
        )}
        <div className="navbar-end">
          {user && (
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />{" "}
              </svg>
            </button>
          )}
          {user && (
          
            <NotificationDropdown/>
          )}

          <div className="dropdown dropdown-end gap-2 m-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={profilePhoto} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                {user ? (
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="/Setting">Setting</Link>
                ) : (
                  <Link to="/register">Register</Link>
                )}
              </li>
              <li>
                {user && (
                  <button onClick={logout}>
                    {loading ? (
                      <span className="loading loading-ring loading-6xl"></span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar