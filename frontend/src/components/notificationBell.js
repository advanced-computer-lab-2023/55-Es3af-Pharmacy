import React from "react";
import { FaBell } from "react-icons/fa"; // Assuming you want to use a bell icon
import { useState } from "react";
import userService from "../services/user.service";
import './NotificationIcon.css'

const NotificationIcon = ({ hasNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const currentURL = window.location.href;
  const [notifications, setNotifications] = useState([])
  //console.log(currentURL)
  const parts = currentURL.split("/");
  //console.log(parts)
  var userType = parts[3];

  // var notifications = [
  //   // // Your list of notifications
  //   { notifID: 1, message: "Notification 1" },
  //   { notifID: 2, message: "Notification 2" },
  //   // Add more notifications as needed
  // ];
  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    await userService.getNotification(userType)
    .then((result) => {
      setNotifications(result.data)
      //console.log(notifications)
    })
    .catch((err) => console.error(err))
    
  };



  return (
    <div>
      <div className="notification-icon-container">
      {hasNotifications ? (
        <div className={`notification-icon ${showNotifications ? "active" : ""}`} onClick={toggleNotifications}>
          <FaBell size={30} />
          <div className="notification-badge"/>
        </div>
      ) : (
        <FaBell size={30} />
      )}
      {showNotifications && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.notifID}>
                {notification.message}
                <br />
                {notification.date}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default NotificationIcon;
