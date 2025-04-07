import BASEURL from "../../baseUrl.js";

const getCategories = async () => {
    try {
      
      const response = await fetch(`${BASEURL}/categories`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  
  export default getCategories;
  