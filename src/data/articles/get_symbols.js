const getSymbols = async () => {
    try {
      const key = 'symbols';
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        if (timestamp === today) {
          return data;
        }
      }
  
      const response = await fetch('https://logos-server-j2ld.onrender.com/articles/symbols');
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
      throw error;
    }
  };
  
  export default getSymbols;
  