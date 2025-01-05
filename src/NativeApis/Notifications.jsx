import React, { useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

function NotificationApi() {
  useEffect(() => {
    const requestPermission = async () => {
      const { granted } = await LocalNotifications.requestPermissions();
      if (!granted) {
        console.error("Notifications permission denied");
      } else {
        scheduleDailyNotifications();
      }
    };
    requestPermission();
  }, []);

  const scheduleDailyNotifications = async () => {
    try {
      const now = new Date();

      // Helper function to get next occurrence of a specific time
      const getNextTime = (hour, minute = 0) => {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        if (now > time) {
          time.setDate(time.getDate() + 1); // Schedule for the next day if the time has passed
        }
        return time;
      };

      // Schedule notifications at 5 AM, 8 AM, and 12 PM
      const times = [
        { id: 1, hour: 5, title: "Good Morning!", body: "Today's devotional is ready for you." },
        { id: 2, hour: 8, title: "Reminder", body: "Have you read the devotional this morning?" },
        { id: 3, hour: 12, title: "Midday Inspiration", body: "Take a moment to reflect on today's message." },
      ];

      const notifications = times.map((time) => ({
        id: time.id,
        title: time.title,
        body: time.body,
        // schedule: {
        //   at: getNextTime(time.hour),
        //   every: "day", // Repeat daily
        // },
        schedule: { at: new Date(Date.now() + 2000), every: "minute" },
        sound: "default",
      }));

      await LocalNotifications.schedule({ notifications });

      console.log("Scheduled daily notifications at 5 AM, 8 AM, and 12 PM.");
    } catch (error) {
      console.error("Failed to schedule daily notifications", error);
    }
  };

  return (
    <></>
  );
}

export default NotificationApi;
