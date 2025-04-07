import BASEURL from "../../baseUrl.js";

const getDecisions = async () => {
    try {
      const response = await fetch(`${BASEURL}/articles/decisions`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getDecisions;
  