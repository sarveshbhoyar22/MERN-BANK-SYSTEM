import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const UseRegister = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  function handleInputErrors(email, password, name, balance) {
    if (!email || !password || !name || !balance || balance>=100000) {
      //react hot toasts.
      if(balance>=100000){

          toast.error("Maximum Initial Balance should be less than 100000");
      }
      toast.error("Please Fill all the fields");
      return false;
    }
    return true;
  }

  const register = async (email, password,name,balance=0) => {
    setloading(true);
    try {
      const success = handleInputErrors(email, password,name,balance);
      if (!success) return;
      // console.log(email, password);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          balance
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
        toast.success("You have registered successful!");
        toast.success(
          " For any further queries please contact us through email"
        );
        // Redirect or perform other actions as needed
      } else {
        toast.error(
          "error in register data message",
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error("error in login", error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, register };
};

export default UseRegister;
