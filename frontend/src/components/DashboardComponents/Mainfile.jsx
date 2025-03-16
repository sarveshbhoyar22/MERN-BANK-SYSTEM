import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useScreenSize from '../../hooks/Usescreensize';
import { Link } from 'react-router-dom';
const Mainfile = () => {
    const {authUser: user} = useAuthContext();
    const {width} = useScreenSize();
    const userdata = localStorage.setItem("user", JSON.stringify(user));
  return (
    <>
      {width > 768 ? (
        <div className="flex justify-center ">
          <Link to ="/profile">
            <div className="stats  shadow border-2 border-gray-800  mt-20 sm:flex block bg-base-300  w-auto m-2  p-5 rounded-xl">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img draggable="false" src="/logo.png" />
                    </div>
                  </div>
                </div>
                <div className="stat-value text-3xl pb-5 ">{user?.name}</div>
                <div className="stat-title text-lg">
                  Account Number:
                  <span className=" ml-2 stat-desc text-lg text-secondary">
                    {user?.account?.accountNumber}
                  </span>
                </div>
                <div className="stat-title text-lg">
                  email:
                  <span className=" ml-2 stat-desc text-secondary text-lg">
                    {user?.email}
                  </span>
                </div>
                <div className="stat-title text-lg">
                  role:
                  <span className=" ml-2 stat-desc text-secondary text-lg">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center w-auto ">
          <div className="stats shadow mt-20 sm:flex block bg-base-300 w-[400px] m-2  p-5 rounded-xl">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img draggable="false" src="/logo.png" />
                  </div>
                </div>
              </div>
              <div className="stat-value text-2xl pb-5 ">{user?.name}</div>
              <div className="stat-title text-sm">
                Account Number:
                <span className=" ml-2 stat-desc text-sm text-secondary">
                  {user?.name === "catterpiller"
                    ? user?.account?.accountNumber
                    : user?.accountNumber}
                </span>
              </div>
              <div className="stat-title text-ms">
                email:
                <span className=" ml-2 stat-desc text-secondary text-sm">
                  {user?.email}
                </span>
              </div>
              <div className="stat-title text-sm">
                role:
                <span className=" ml-2 stat-desc text-secondary text-sm">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Mainfile