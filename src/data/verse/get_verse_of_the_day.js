export const GetDailyVerse = async () => {
    const key = 'dailyVerse';
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        // Check if the cached timestamp is the same as today's date
        if (timestamp === today) {
          console.log('Returning cached daily verse');
          return data;
        }
      }
  
      // Fetch the daily verse if no valid cache is found
      const url = 'https://beta.ourmanna.com/api/v1/get?format=json&order=daily';
      const options = { method: 'GET', headers: { accept: 'application/json' } };
  
      const res = await fetch(url, options);
      const json = await res.json();
  
      const { verse } = json;
      const { reference, text, version, verseurl } = verse.details;
      const { notice } = verse;
  
      const data = { reference, text, version, verseurl, notice };
  
      // Store the fetched data with today's timestamp in local storage
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: today,
        })
      );
  
      return data;
    } catch (err) {
      console.error("Failed to fetch daily verse:", err);
      throw err; // Re-throw the error to let the caller handle it
    }
  };
  
  // Use the function
  // GetDailyVerse()
  //     .then((response) => {
  //         console.log("Daily Verse:", response);
  //     })
  //     .catch((err) => {
  //         console.error("Error occurred:", err);
  //     });
  