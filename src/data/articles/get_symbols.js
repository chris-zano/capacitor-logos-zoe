const getSymbols = async () => {
    try {
      const response = await fetch('https://logos-server-j2ld.onrender.com/articles/symbols');
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getSymbols;
  