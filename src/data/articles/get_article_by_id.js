const getArticleById = async (id) => {
    try {
      const key = `article_${id}`;
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          return data;
        }
      }
  
      // Fetch new article if no valid cache is found
      const response = await fetch(`https://logos-server-j2ld.onrender.com/articles/article/${id}`);
      const data = await response.json();
  
      // Store the new article with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getArticleById;
  