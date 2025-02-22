// src/background.js

addEventListener('scheduleNotification', async (resolve, reject) => {
    try {
      const now = new Date();
      const sixAM = new Date();
      sixAM.setHours(8, 20, 0, 0);
  
      // If it's past 6 AM today, schedule for 6 AM tomorrow
      if (now > sixAM) {
        sixAM.setDate(sixAM.getDate() + 1);
      }
  
      const timeUntilSixAM = sixAM.getTime() - now.getTime();
  
      // Use setTimeout to schedule the notification
      setTimeout(async () => {
        try {
          await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [
              {
                title: 'Good Morning!',
                body: 'This is your 8.20 AM notification.',
                id: 1,
                schedule: { at: new Date() },
                sound: null,
                attachments: null,
                actionTypeId: '',
                extra: null
              }
            ]
          });
          resolve();
        } catch (notificationError) {
          reject(notificationError);
        }
      }, timeUntilSixAM);
    } catch (error) {
      reject(error);
    }
  });
  