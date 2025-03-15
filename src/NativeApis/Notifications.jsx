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

  async function scheduleDailyDevotionalReminder() {
    // Request permission first
    const permissionStatus = await LocalNotifications.requestPermissions();
    
    if (permissionStatus.display === 'granted') {
      // Get tomorrow at 6 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(6, 0, 0, 0);

      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Daily Devotional Reminder",
            body: "It's time for your daily devotional reading!",
            id: 1,
            schedule: {
              at: tomorrow, // First notification at 6 AM tomorrow
              repeating: true,
              every: 'day'
            },
            sound: 'default',
            actionTypeId: 'OPEN_DEVOTIONAL',
          }
        ]
      });
    }
  }

  useEffect(() => {
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      // Handle notification tap
      if (notification.actionId === 'OPEN_DEVOTIONAL') {
        // Navigate to devotional page
        // You'll need to implement this based on your navigation setup
        navigateToDevotional();
      }
    });
  }, []);

  async function checkExistingNotifications() {
    const pendingNotifications = await LocalNotifications.getPending();
    if (pendingNotifications.notifications.length === 0) {
      await scheduleDailyDevotionalReminder();
    }
  }

  useEffect(() => {
    checkExistingNotifications();
  }, []);

  return null; // No UI element needed
}

export default NotificationApi;
