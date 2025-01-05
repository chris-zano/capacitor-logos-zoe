const getSearchData = async () => {
    try {
      const key = 'searchData';
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log('Returning cached search data');
          return data;
        }
      }
  
      // Fetch new search data if no valid cache is found
      console.log('Fetching new search data');
      const response = await fetch('https://logos-server-j2ld.onrender.com/data/search/pre-load');
      const data = await response.json();
  
      // Store the new search data with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (error) {
      console.error('Error fetching search data:', error);
      throw error;
    }
  };
  
  export default getSearchData;
  