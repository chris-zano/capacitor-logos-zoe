const getCategoryById = async (id) => {
    try {
      const key = `category_${id}`;
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log(`Returning cached category for ID: ${id}`);
          return data;
        }
      }
  
      // Fetch new category if no valid cache is found
      console.log(`Fetching new category for ID: ${id}`);
      const response = await fetch(`https://logos-server-j2ld.onrender.com/categories/category/${id}`);
      const data = await response.json();
  
      // Store the new category with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      console.error(`Error fetching category for ID ${id}:`, error);
      throw error;
    }
  };
  
  export default getCategoryById;
  