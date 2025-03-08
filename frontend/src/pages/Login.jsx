import React, { useState } from "react";


import UseLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 const { loading, login } = UseLogin();
 

  const handleLogin = async (e) => {
    e.preventDefault();
   await login(email, password);
    
  };

  return (
    <form action="" onSubmit={handleLogin} method="post">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              The application provides a secure and user-friendly platform for
              banking operations
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                  <Link to={"/register"} className="link link-hover">Don't have account ?</Link>
                </div>
                <button className="btn btn-neutral mt-4" disabled={loading}>
                  {" "}
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
