import React from "react";
import { FaBell } from "react-icons/fa"; // Assuming you want to use a bell icon
import { useState } from "react";
import userService from "../services/user.service";

const NotificationIcon = ({ hasNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const currentURL = window.location.href;
  //console.log(currentURL)
  const parts = currentURL.split("/");
  //console.log(parts)
  var userType = parts[3];

  var notifications = [
    // // Your list of notifications
    // { id: 1, text: "Notification 1" },
    // { id: 2, text: "Notification 2" },
    // Add more notifications as needed
  ];
  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    var response = await userService.getNotification(userType)
    console.log(response.data)
  };



  return (
    <div>
      {hasNotifications ? (
        <div
          style={{
            position: "relative",
            color: showNotifications ? "#cccccc" : "white",
          }}
          onClick={toggleNotifications}
        >
          <FaBell size={30} />
          <div
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              background: "red",
              borderRadius: "50%",
              width: 10,
              height: 10,
            }}
          />
        </div>
      ) : (
        <FaBell size={30} />
      )}
      {showNotifications && (
        <div style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
          <h3>Notifications</h3>
          {notifications.map((notification) => (
            <div>{notification.message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
