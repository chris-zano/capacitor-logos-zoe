import BASEURL from "../../baseUrl.js";

const getAllVideos = async () => {
    const key = 'allVideos';
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0];
  
    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        if (timestamp === today) {
          return data;
        }
      }
  
      const response = await fetch(`${BASEURL}/videos`);
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
      console.error('Error fetching videos:', error);
      throw error;
    }
  };
  
  export default getAllVideos;
  