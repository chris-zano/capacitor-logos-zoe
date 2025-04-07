import BASEURL from "../../baseUrl.js";

const getSpiritualLaws = async () => {
    try {
      const response = await fetch(`${BASEURL}/articles/spiritual-laws`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getSpiritualLaws;
  