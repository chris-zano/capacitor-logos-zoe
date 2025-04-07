import BASEURL from "../../baseUrl.js"

const getSearchData = async () => {
  try {
    const response = await fetch(`${BASEURL}/data/search/pre-load`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching search data:', error);
    throw error;
  }
};

export default getSearchData;
