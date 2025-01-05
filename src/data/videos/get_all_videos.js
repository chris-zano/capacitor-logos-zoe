const getAllVideos = async () => {
    const key = 'allVideos';
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log('Returning cached videos');
          return data;
        }
      }
  
      // Fetch new videos if no valid cache is found
      console.log('Fetching new videos');
      const response = await fetch('https://logos-server-j2ld.onrender.com/videos');
      const data = await response.json();
  
      // Store the new videos with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  };
  
  export default getAllVideos;
  