import BASEURL from "../../baseUrl.js";

const getSymbols = async () => {
    try {
      const response = await fetch(`${BASEURL}/articles/symbols`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getSymbols;
  