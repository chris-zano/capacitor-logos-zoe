const getTodaysDevotional = async () => {
    try {
      const key = 'todaysDevotional';
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log('Returning cached devotional');
          return data;
        }
      }
  
      // Fetch new devotional if no valid cache is found
      console.log('Fetching new devotional');
      const response = await fetch('https://logos-server-j2ld.onrender.com/devotionals/today');
      const data = await response.json();
  
      // Store the new devotional with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      console.error('Error fetching today\'s devotional:', error);
      throw error;
    }
  };
  
  export default getTodaysDevotional;
  