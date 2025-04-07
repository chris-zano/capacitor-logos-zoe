import BASEURL from "../../baseUrl.js";

const getArticleById = async (id) => {
    try {
      const response = await fetch(`${BASEURL}/articles/article${id}`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getArticleById;
  