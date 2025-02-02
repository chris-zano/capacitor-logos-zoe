const getVideosByCategoryName = async ({ category_name }) => {
    const key = `videos_${category_name}`;
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0];
  
    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        if (timestamp === today) {
          return data;
        }
      }
  
      const response = await fetch(`https://logos-server-j2ld.onrender.com/videos/${category_name}`);
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
      console.error(`Error fetching videos for category: ${category_name}`, error);
      throw error;
    }
  };
  
  export default getVideosByCategoryName;
  