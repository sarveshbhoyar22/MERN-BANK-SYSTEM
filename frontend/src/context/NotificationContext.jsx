import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const API_BASE_URL = "http://localhost:5000/api";



const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      fetchNotifications();
    }
  }, [authUser]);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const { data } = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
        withCredentials: true,
      });
      console.log("notifications:",notifications)
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
        const noti = id;
      await api.put(
        `/notifications/${noti}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, status: "read" } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, fetchNotifications, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;