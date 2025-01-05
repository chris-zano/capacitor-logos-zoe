const getProducts = async () => {
  try {
    const key = 'products';
    const cachedData = localStorage.getItem(key);
    const today = new Date();
    const currentTimestamp = today.getTime(); // Current timestamp in milliseconds

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const cachedDate = new Date(timestamp);
      const cachedTimestamp = cachedDate.getTime();

      // Check if the cached data is less than 7 days old
      if (currentTimestamp - cachedTimestamp <= 7 * 24 * 60 * 60 * 1000) {
        console.log('Returning cached products');
        return data;
      }
    }

    // Fetch new products if no valid cache is found or if cache is older than 7 days
    console.log('Fetching new products');
    const response = await fetch('https://logos-server-j2ld.onrender.com/products');
    const data = await response.json();

    // Store the new products with today's timestamp in local storage
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: today.toISOString(), // Store timestamp in ISO format
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default getProducts;
