import BASEURL from "../../baseUrl.js";

const getTodaysDevotional = async () => {
  try {

    const response = await fetch(`${BASEURL}/devotionals/today`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching today\'s devotional:', error);
    throw error;
  }
};

export default getTodaysDevotional;
