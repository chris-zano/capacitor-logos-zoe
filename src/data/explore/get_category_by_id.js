import BASEURL from "../../baseUrl.js";

const getCategoryById = async (id) => {
    try {      
      const response = await fetch(`${BASEURL}/categories/category/${id}`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(`Error fetching category for ID ${id}:`, error);
      throw error;
    }
  };
  
  export default getCategoryById;
  