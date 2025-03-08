import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const UseLogin = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  function handleInputErrors(email, password) {
    if (!email || !password) {
      //react hot toasts.
      toast.error("Please Fill all the fields");
      return false;
    }
    return true; 
  }

  const login = async (email, password) => {
    setloading(true);
    try {
      const success = handleInputErrors(email, password);
      if (!success) return;
      // console.log(email, password);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error("ERROR IN LOGIN AFTER FETCHING DATA", data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);

      if (res.ok) {
        // Handle successful signup
        toast.success("login successful!");
        // Redirect or perform other actions as needed
      } else {
        toast.error(
          "error in login data message",
          data.message || "login failed. Please try again."
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error("error in login", error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, login };
};

export default UseLogin;
