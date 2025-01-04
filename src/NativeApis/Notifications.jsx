import React, { useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

function NotificationApi() {
  useEffect(() => {
    // Request permission for notifications on app start
    const requestPermission = async () => {
      const { granted } = await LocalNotifications.requestPermissions();
      if (!granted) {
        console.error("Notifications permission denied");
      }
    };
    requestPermission();
  }, []);

  const sendNotification = async () => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: "Hello!",
            body: "This is a test notification.",
            schedule: { at: new Date(Date.now() + 1000 * 2) }, // 2 seconds from now
          },
        ],
      });
    } catch (error) {
      console.error("Failed to send notification", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
}

export default NotificationApi;
