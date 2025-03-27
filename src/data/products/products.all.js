const getProducts = async () => {
  try {
    const key = 'products';
    const cachedData = localStorage.getItem(key);
    const today = new Date();
    const currentTimestamp = today.getTime();

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const cachedDate = new Date(timestamp);
      const cachedTimestamp = cachedDate.getTime();


      if (currentTimestamp - cachedTimestamp <= 7 * 24 * 60 * 60 * 1000) {
        return data;
      }
    }


    const response = await fetch('https://logos-server-j2ld.onrender.com/products');
    const data = await response.json();


    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: today.toISOString(),
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default getProducts;
