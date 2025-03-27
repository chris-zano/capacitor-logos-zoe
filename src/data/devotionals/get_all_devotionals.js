const getAllDevotionals = async () => {
  try {
    const key = 'allDevotionals';
    const cachedData = localStorage.getItem(key);
    const today = new Date().toISOString().split('T')[0];

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);


      if (timestamp === today) {
        return data;
      }
    }


    const response = await fetch('https://logos-server-j2ld.onrender.com/devotionals');
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
    console.error('Error fetching all devotionals:', error);
    throw error;
  }
};

export default getAllDevotionals;
