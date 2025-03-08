import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundVideo from '../components/BackgrouondVideo';
import Secondpage from '../components/secondpage';

const Home = () => {
  return (
    <>

      {/* //first part */}
      
      <div
        className="hero h-screen border-2 rounded-xl  "
        style={{
          
          backgroundImage: "url(/bank.jpg)",
          
        }}
        > 
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold">Welcome to Auth-Bank</h1>
            <p className="mb-5">
              The application provides a secure and user-friendly platform for
              banking operations
            </p>
            <Link to={"/login"}>
            
            <button className="btn btn-success">Get Started</button>
            </Link>
          </div>
        </div>
      </div>


      {/* second part */}

      {/* <Secondpage/> */}
    </>
  );
}

export default Home