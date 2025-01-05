import React, { useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

function NotificationApi() {
  useEffect(() => {
    const requestPermissionAndSchedule = async () => {
      const { granted } = await LocalNotifications.requestPermissions();
      if (!granted) {
        console.error("Notifications permission denied");
        return;
      }

      // Cancel existing notifications to prevent duplicates
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

      scheduleDailyNotification();
    };

    requestPermissionAndSchedule();
  }, []);

  const scheduleDailyNotification = async () => {
    try {
      // Calculate the next 5 AM
      const now = new Date();
      const nextFiveAM = new Date();
      nextFiveAM.setHours(6, 0, 0, 0); // Set time to 5:00 AM

      if (now > nextFiveAM) {
        // If the current time is past 5 AM today, schedule for tomorrow
        nextFiveAM.setDate(nextFiveAM.getDate() + 1);
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: "Good Morning!",
            body: "Today's devotional is ready for you.",
            schedule: { at: nextFiveAM }, // Schedule for the calculated 5 AM
            sound: "default",
          },
        ],
      });

      console.log("Daily notification scheduled for:", nextFiveAM);
    } catch (error) {
      console.error("Failed to schedule notification", error);
    }
  };

  return null; // No UI element needed
}

export default NotificationApi;
