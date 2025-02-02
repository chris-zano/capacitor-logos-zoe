const getVideoById = async ({ videoId, category }) => {
    const key = `video_${category}_${videoId}`;
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0];
    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        if (timestamp === today) {
          return data;
        }
      }
  
      const response = await fetch(`https://logos-server-j2ld.onrender.com/videos/${videoId}/${category}`);
      const data = await response.json();
  
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
  