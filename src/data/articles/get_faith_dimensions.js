import BASEURL from "../../baseUrl.js";

const getFaithDimensions = async () => {
    try {
      const response = await fetch(`${BASEURL}/articles/faith-dimensions`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getFaithDimensions;
  