const getSearchData = async () => {
  try {
    const response = await fetch('https://logos-server-j2ld.onrender.com/data/search/pre-load');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching search data:', error);
    throw error;
  }
};

export default getSearchData;
