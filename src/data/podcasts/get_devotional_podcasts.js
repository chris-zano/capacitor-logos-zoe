const getDevotionalsPodcasts = async () => {
  try {
      const key = 'devotionalsPodcasts';
      const cachedData = localStorage.getItem(key);
      const now = new Date().getTime(); // Get current time in milliseconds

      if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          // Check if the cached data is still within the last hour
          if (now - timestamp < 3600000) {
              console.log('Returning cached devotionals podcasts');
              return data;
          }
      }

      // Fetch new devotionals podcasts if no valid cache is found
      console.log('Fetching new devotionals podcasts');
      const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/devotionals');
      const data = await response.json();

      // Store the new devotionals podcasts with current timestamp in local storage
      localStorage.setItem(
          key,
          JSON.stringify({
              data,
              timestamp: now, // Store the current time
          })
      );

      return data;
  } catch (error) {
      console.error('Error fetching devotionals podcasts:', error);
      throw error;
  }
};

export default getDevotionalsPodcasts;
