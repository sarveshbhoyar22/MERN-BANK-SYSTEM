import { useNotificationContext } from "../context/NotificationContext";
import { useState } from "react";

const NotificationDropdown = () => {
  const { notifications, markAsRead } = useNotificationContext();
  const [open, setOpen] = useState(false);

  const handleMarkedAsRead = async (id) => {
  
       try {
         await markAsRead(id);
       } catch (error) {
        console.error("Error marking notification as read:", error);
       }
    
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2">
        <div
          className="btn btn-ghost btn-circle"
          onClick={() => setOpen(!open)}
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            {/* {notifications.filter((n) => n.status === "unread").length > 0 && (
              <span className="badge badge-xs badge-primary indicator-item"></span>
            )} */}
            {notifications.filter((n) => n.status === "unread").length > 0 && (
              <span className="badge badge-xs indicator-item absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.filter((n) => n.status === "unread").length}
              </span>
            )}
          </div>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-64 h-80 bg-gray-900 overflow-auto shadow-lg rounded-lg p-2">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-2 border-b  hover:cursor-pointer rounded-lg ${
                  notif.status === "unread" ? "border-2 border-blue-500" : "bg-black"
                }`}
                onClick={() => handleMarkedAsRead(notif._id)}
              >
                <p className="text-sm">
                  {notif.message}

                </p>
                <small className="text-xs text-gray-400">
                  {new Date(notif.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
