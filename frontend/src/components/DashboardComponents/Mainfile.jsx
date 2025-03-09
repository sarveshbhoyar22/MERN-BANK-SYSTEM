import React from 'react'
import { useAuthContext } from '../../context/AuthContext';

const Mainfile = () => {
    const {authUser: user} = useAuthContext();
  return (
    <div className="flex justify-center">
      <div className="stats shadow mt-20 bg-black border-2 border-gray-500 p-5 rounded-xl">
        <div className="stat">
          <div className="stat-figure text-primary">✨</div>
          {/* <div></div> */}
          <div className="stat-title">Current Balance</div>
          <div className="stat-value text-sky-300">
            $ {user.account.balance}
          </div>
          <div className="stat-desc"></div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img draggable="false" src="/logo.png" />
              </div>
            </div>
          </div>
          <div className="stat-value text-2xl">{user.name}</div>
          <div className="stat-title">
            Account Number: 
            <span className=" ml-2 stat-desc text-secondary">
              {user.account.accountNumber}
            </span>
          </div>
          <div className="stat-title">
            email: 
            <span className=" ml-2 stat-desc text-secondary">
              {user.email}
            </span>
          </div>
          <div className="stat-title">
            role: 
            <span className=" ml-2 stat-desc text-secondary">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainfile