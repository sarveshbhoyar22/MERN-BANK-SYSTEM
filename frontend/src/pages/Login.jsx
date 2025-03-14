import React, { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import UseLogin from "../hooks/useLogin";

const Login = () => {
  

  const [email, setEmail] = useState("catterpiller@gmail.com");
  const [password, setPassword] = useState("catterpiller");
  const [error, setError] = useState("");
  const { loading, login } = UseLogin();
  const Navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const result  = await login(email, password);
    if(result){
      Navigate("/dashboard");
    }
     
    
  };

  return (
    <form action="" onSubmit={handleLogin} method="post">
        <div className="hero bg-black min-h-screen ">
      <div className="sm:ml-50">
          <div className="hero-content flex-col lg:flex-row-reverse ">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6 sm:w-2/3">
                Experience a secure and user-friendly banking platform designed
                for seamless financial operations. Manage your transactions,
                check balances, apply for loans, and more—all with enhanced
                security and convenience.
              </p>
            </div>
            <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="fieldset-label">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="fieldset-label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div>
                    <Link to={"/register"} className="link link-hover">
                      Don't have account ?
                    </Link>
                  </div>
                  <button
                    className="btn btn-neutral bg-blue-500 mt-4"
                    disabled={loading}
                  >
                    {" "}
                    {loading ? (
                      <span className="loading loading-ring loading-xl"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
