const getSymbols = async () => {
    try {
      const key = 'symbols';
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log('Returning cached symbols');
          return data;
        }
      }
  
      // Fetch new symbols if no valid cache is found
      console.log('Fetching new symbols');
      const response = await fetch('https://logos-server-j2ld.onrender.com/articles/symbols');
      const data = await response.json();
  
      // Store the new symbols with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      console.error('Error fetching symbols:', error);
      throw error;
    }
  };
  
  export default getSymbols;
  