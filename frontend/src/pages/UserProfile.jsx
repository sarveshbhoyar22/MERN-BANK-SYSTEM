import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { set } from "mongoose";
import { Navigate } from "react-router-dom";
import useScreenSize from "../hooks/Usescreensize";

const UserProfile = () => {

  const {width} = useScreenSize();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
  });
  const [OldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [opennew, setOpennew] = useState(false);
  const [done, setDone] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);


  useEffect(() => {
    const user2 = JSON.parse(localStorage.getItem("user"));
    setUser(user2);

    if(done){
      setNewPassword("");
      setOldPassword("");
      setOpennew(false);
      setDone(false);
      setOtpSent(false);
    }
  }, []);
   
   
   
  
  // const {authuser:user} = useAuthContext();

  const handleChangePassword = async () => {

  
    const verifyold = async () => {
      try {
        // setOldPassword(OldPassword);
        if(!OldPassword ){
          toast.error("Please Enter Old Password");
        }
        console.log(OldPassword)
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `http://localhost:5000/forget/verify-old`,
          { oldPassword: OldPassword , email: user.email },
          {
            headers: {
              "Content-Type": "application/json", 
              
              Authorization: `Bearer ${token}` },
            withCredentials: true,
          } 
        );

        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(
          toast.error("Error updating profile:"),
          error.response?.data?.message || error.message
        );
        return false;
      }
    };

    if (await verifyold()) {
      console.log(newPassword)
      const res3 = await axios.post(

        "http://localhost:5000/forget/reset-password",
        {newPassword , email: user.email},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res3.status === 200) {
        setDone(true);
        toast.success("Password Updated");
      }
       
     };
     

    
  };

 

  const sendotp = async () => {
    try {
      
      const res = await axios.post(
        "http://localhost:5000/forget/forget-password",
        { email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Otp Sent to Your Email");

        setOpennew(true);
        setOtpSent(true);
      }
    } catch (error) {
      console.error(
        toast.error("Error updating Password:"),
        error.response?.data?.message || error.message
      );
    }
  };

  const verifyotp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/forget/verify-otp",
        { otp: otp ,email: user.email},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setVerified(true);
        setOtpSent(false);
        toast.success("Otp Verified");
      }
    } catch (error) {
      console.error(
        toast.error("Error updating Password:"),
        error.response?.data?.message || error.message
      );
    }}

  const resetPassword = async () => {
    try {
      
      const res = await axios.post(
        "http://localhost:5000/forget/reset-password",
        {newPassword , email: user.email},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setDone(true);
        setOpennew(false);
        setVerified(false);
        setNewPassword("");
        setOldPassword("");

        Navigate("/dashboard");
        toast.success("Password Updated");
      }
    } catch (error) {
      console.error(
        toast.error("Error updating Password:"),
        error.response?.data?.message || error.message
      );  
    }finally{
      setOpennew(false);
      setVerified(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/info/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        // setUser(response.data);
        setUpdatedUser({
          name: response.data.name,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/info/update-User`,
         updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update user in local storage
      const updatedUserData = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      setUser(updatedUserData);
      setEditMode(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle password update
 

  return (
    <div className="p-6 bg-black text-white min-h-screen flex justify-center">
      <div className="mt-16">
        {width > 768 && (
          <div className="w-[600px] max-w-lg bg-black border-2 border-gray-600 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            {/* Display User Info */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white p-2 rounded mt-1"
                />
              ) : (
                <p className="bg-gray-700 p-2 rounded">{user?.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Email:</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700  text-white p-2 rounded mt-1"
                />
              ) : (
                <p className="bg-gray-700 p-2 rounded">{user.email}</p>
              )}
            </div>

            {/* <div className="mb-4">
          <label className="block text-sm font-medium">Role:</label>
          <p className="bg-gray-700 p-2 rounded">{user.role}</p>
        </div> */}

            {/* Edit Profile Buttons */}
            {editMode ? (
              <div className="flex gap-4">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Edit Profile
              </button>
            )}

            {/* Change Password Section */}
            {!opennew && (
              <div className="mt-6 w-[320px]">
                <h3 className="text-lg font-bold mb-2">Change Password</h3>
                <input
                  type="password"
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`${
                    opennew ? "hidden" : "block"
                  } w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter old password"
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={` w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter new password"
                />

                <button
                  onClick={() => setOpennew(true)}
                  className={`mt-2 text-white cursor-pointer hover:underline py-2 rounded ml-2`}
                >
                  Forget Password
                </button>
                <br />
                <button
                  onClick={handleChangePassword}
                  className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                >
                  Submit
                </button>
              </div>
            )}

            {opennew && !verified && (
              <div className="mt-6 w-[320px]">
                <h3 className="text-lg font-bold mb-2">Change Password</h3>

                <input
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={` w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter OTP"
                />

                <div>OTP will be valid for 5 minutes</div>
                <br />
                {!otpSent && (
                  <button
                    onClick={sendotp}
                    className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                  >
                    Send OTP
                  </button>
                )}
                {otpSent && (
                  <button
                    onClick={verifyotp}
                    className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            )}
            {opennew && verified && (
              <div className="mt-6 w-[320px]">
                <h3 className="text-lg font-bold mb-2">Change Password</h3>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={` w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter New Password"
                />

                <br />
                <button
                  onClick={resetPassword}
                  className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                >
                  Set Password
                </button>
              </div>
            )}
          </div>
        )}
        {width < 768 && (
          <div className="w-full max-w-lg bg-black border-2 border-gray-600 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            {/* Display User Info */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white p-2 rounded mt-1"
                />
              ) : (
                <p className="bg-gray-700 p-2 rounded">{user?.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Email:</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700  text-white p-2 rounded mt-1"
                />
              ) : (
                <p className="bg-gray-700 p-2 rounded">{user.email}</p>
              )}
            </div>

            {/* <div className="mb-4">
          <label className="block text-sm font-medium">Role:</label>
          <p className="bg-gray-700 p-2 rounded">{user.role}</p>
        </div> */}

            {/* Edit Profile Buttons */}
            {editMode ? (
              <div className="flex gap-4">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Edit Profile
              </button>
            )}

            {/* Change Password Section */}
            {!opennew && (
              <div className="mt-6 w-[320px]">
                <h3 className="text-lg font-bold mb-2">Change Password</h3>
                <input
                  type="password"
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`${
                    opennew ? "hidden" : "block"
                  } w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter old password"
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={` w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter new password"
                />

                <button
                  onClick={() => setOpennew(true)}
                  className={`mt-2 text-white cursor-pointer hover:underline py-2 rounded ml-2`}
                >
                  Forget Password
                </button>
                <br />
                <button
                  onClick={handleChangePassword}
                  className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                >
                  Submit
                </button>
              </div>
            )}

            {opennew && !verified && (
              <div className="mt-6 w-[320px]">
                <h3 className="text-lg font-bold mb-2">Change Password</h3>

                <input
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={` w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter OTP"
                />

                <div>OTP will be valid for 5 minutes</div>
                <br />
                {!otpSent && (
                  <button
                    onClick={sendotp}
                    className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                  >
                    Send OTP
                  </button>
                )}
                {otpSent && (
                  <button
                    onClick={verifyotp}
                    className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            )}
            {opennew && verified && (
              <div className="mt-6 w-[320px]">
                <h3 className="text-lg font-bold mb-2">Change Password</h3>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={` w-full bg-gray-700 text-white p-2 rounded mt-1`}
                  placeholder="Enter New Password"
                />

                <br />
                <button
                  onClick={resetPassword}
                  className={` mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded`}
                >
                  Set Password
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
