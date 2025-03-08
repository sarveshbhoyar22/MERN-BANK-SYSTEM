import React, { useState } from "react";

import UseRegister from "../hooks/UseRegister";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("testmesarvesh@gmail.com");
  const [name, setName] = useState("sarvesh");
  const [balance, setbalance] = useState("1000");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, register } = UseRegister();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, password,name, balance);
  };

  return (
    <form action="" onSubmit={handleRegister} method="post">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              The application provides a secure and user-friendly platform for
              banking operations
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                  className="input"
                  placeholder="Name"
                />
                <label className="fieldset-label">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="fieldset-label">Initial Balance</label>
                <input
                  value={balance}
                  onChange={(e) => setbalance(e.target.value)}
                  type="balance"
                  className="input"
                  placeholder="Initial Balance < 100000"
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
                  <Link to={"/login"} className="link link-hover">Already have an account?</Link>
                </div>
                <button className="btn btn-neutral mt-4" disabled={loading}>
                  {" "}
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Register"
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

export default Register;
