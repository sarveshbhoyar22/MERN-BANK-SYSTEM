import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundVideo from '../components/BackgrouondVideo';
import Secondpage from '../components/secondpage';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const { authUser: user } = useAuthContext();

  return (
    <>
      {/* //first part */}

      <div
        className="hero h-screen border-2 rounded-xl bg-black  "
        style={{
          backgroundImage: "url(/bank.jpg)",
        }}
      >
        <div className="hero-overlay "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold">Welcome to Auth-Bank</h1>
            <p className="mb-5">
              Experience a secure and user-friendly banking platform designed
              for seamless financial operations. Manage your transactions, check
              balances, apply for loans, and more—all with enhanced security and
              convenience.
            </p>
            {user ? (
              <Link to={"/dashboard"}>
                <button className="btn btn-success">Get Started</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="btn btn-success">Get Started</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* second part */}

      {/* <Secondpage/> */}
    </>
  );
}

export default Home