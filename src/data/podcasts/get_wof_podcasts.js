const getWofPodcasts = async () => {
  try {
    const key = 'wofPodcasts';
    const cachedData = localStorage.getItem(key);
    const now = new Date().getTime();

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);


      if (now - timestamp < 3600000) {
        console.log('Returning cached WOF podcasts');
        return data;
      }
    }


    console.log('Fetching new WOF podcasts');
    const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/wof');
    const data = await response.json();


    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: now,
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching WOF podcasts:', error);
    throw error;
  }
};

export default getWofPodcasts;
