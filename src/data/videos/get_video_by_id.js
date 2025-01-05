const getVideoById = async ({ videoId, category }) => {
    const key = `video_${category}_${videoId}`;
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log(`Returning cached video: ${videoId} from category: ${category}`);
          return data;
        }
      }
  
      // Fetch new video data if no valid cache is found
      console.log(`Fetching new video: ${videoId} from category: ${category}`);
      const response = await fetch(`https://logos-server-j2ld.onrender.com/videos/${videoId}/${category}`);
      const data = await response.json();
  
      // Store the new video data with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      console.error(`Error fetching video: ${videoId} from category: ${category}`, error);
      throw error;
    }
  };
  
  export default getVideoById;
  