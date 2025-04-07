import BASEURL from "../../baseUrl.js";

const getRecommendedArticles = async () => {
    try {
      const response = await fetch(`${BASEURL}/articles/recommended`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getRecommendedArticles;
  