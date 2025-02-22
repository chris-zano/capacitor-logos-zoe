const getCategoryById = async (id) => {
    try {      
      const response = await fetch(`https://logos-server-j2ld.onrender.com/categories/category/${id}`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(`Error fetching category for ID ${id}:`, error);
      throw error;
    }
  };
  
  export default getCategoryById;
  