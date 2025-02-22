const getCategories = async () => {
    try {
      
      const response = await fetch('https://logos-server-j2ld.onrender.com/categories');
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  
  export default getCategories;
  