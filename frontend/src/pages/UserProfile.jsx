import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { set } from "mongoose";
import { Navigate } from "react-router-dom";
import useScreenSize from "../hooks/Usescreensize";
import Goback from "../components/Goback";
import { SlOptions } from "react-icons/sl";

const UserProfile = () => {
  const { width } = useScreenSize();
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

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const user2 = JSON.parse(localStorage.getItem("user"));
    setUser(user2);

    if (done) {
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
        if (!OldPassword) {
          toast.error("Please Enter Old Password");
        }
        console.log(OldPassword);
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${BASE_URL}/forget/verify-old`,
          { oldPassword: OldPassword, email: user.email },
          {
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },
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
      console.log(newPassword);
      const res3 = await axios.post(
        `${BASE_URL}/forget/reset-password`,
        { newPassword, email: user.email },
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
    }
  };

  const sendotp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forget/forget-password`,
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
        `${BASE_URL}/forget/verify-otp`,
        { otp: otp, email: user.email },
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
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forget/reset-password`,
        { newPassword, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setDone(true);
      setOpennew(false);
      setVerified(false);
      setNewPassword("");
      setOldPassword("");

      toast.success("Password Updated");
    } catch (error) {
      console.error(
        toast.error("Error updating Password:"),
        error.response?.data?.message || error.message
      );
    } finally {
      setOpennew(false);
      setVerified(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/info/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/info/update-User`,
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
    }finally{
      setLoading(false);
    }
  };

  //profile picture change
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProfileClick = async (file) => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData =new FormData();
    formData.append("profilePhoto", file);

    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Logs key-value pairs in FormData
    }
   
    try {
      const res = await axios.post(
        `${BASE_URL}/api/info/profile-update`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("Server response:", res); // Debugging log

      if (res.status === 200) {
        toast.success("Profile Picture Updated");
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen flex justify-center">
      <div className="mt-16 w-full max-w-lg bg-black border border-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-white">
          <Goback />
          <img
            src={user?.profilePhoto}
            className="rounded-full h-12 w-12 "
            alt=""
          />
          User Profile
        </h2>

        <div className="text-white p-1">Update Profile Picture</div>
        <input
          type="file"
          
          onChange={handleFileChange}
          className="btn p-2 mr-1 hover:bg-gray-700 "
        />
        {loading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <button
            className="btn text-sm hover:bg-gray-700 "
            onClick={() => handleProfileClick(selectedFile)}
          >
            Upload
          </button>
        )}

        {/* User Information */}
        <div className="space-y-5 m-1">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Name:
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              />
            ) : (
              <p className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                {user?.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email:
            </label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              />
            ) : (
              <p className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Edit Profile Buttons */}
        <div className="flex gap-4 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="w-full bg-gray-600 cursor-pointer hover:bg-gray-500 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-green-700 hover:bg-green-800 cursor-pointer text-white font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Change Password Section */}
        {!opennew && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">
              Change Password
            </h3>
            <input
              type="password"
              value={OldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              placeholder="Enter old password"
            />

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring focus:ring-blue-500 outline-none mt-3"
              placeholder="Enter new password"
            />

            <button
              onClick={() => setOpennew(true)}
              className="mt-3 text-blue-400 hover:underline transition duration-200"
            >
              Forgot Password?
            </button>

            <button
              onClick={handleChangePassword}
              className="mt-4 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Submit
            </button>
          </div>
        )}

        {/* OTP Verification & Reset Password */}
        {opennew && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">
              Verify OTP
            </h3>
            {!verified ? (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Enter OTP"
                />
                <p className="text-gray-400 mt-2">
                  OTP is valid for 5 minutes.
                </p>
                {!otpSent ? (
                  <button
                    onClick={sendotp}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                  >
                    Send OTP
                  </button>
                ) : (
                  <button
                    onClick={verifyotp}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                  >
                    Verify OTP
                  </button>
                )}
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-3 text-gray-200">
                  Reset Password
                </h3>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Enter New Password"
                />
                <button
                  onClick={resetPassword}
                  className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                >
                  Set Password
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
