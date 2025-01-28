const getDecisions = async () => {
    try {
      const key = 'decisions';
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          return data;
        }
      }
  
      // Fetch new decisions if no valid cache is found
      const response = await fetch('https://logos-server-j2ld.onrender.com/articles/decisions');
      const data = await response.json();
  
      // Store the new decisions with today's timestamp in local storage
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
  
  export default getDecisions;
  