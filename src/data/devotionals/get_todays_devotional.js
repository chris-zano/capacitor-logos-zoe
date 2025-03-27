const getTodaysDevotional = async () => {
  try {
    const key = 'todaysDevotional';
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0];

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);


      if (timestamp === today) {
        return data;
      }
    }


    const response = await fetch('https://logos-server-j2ld.onrender.com/devotionals/today');
    const data = await response.json();


    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: today,
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching today\'s devotional:', error);
    throw error;
  }
};

export default getTodaysDevotional;
