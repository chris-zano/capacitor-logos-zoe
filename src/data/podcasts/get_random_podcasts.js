const getRandomPodcasts = async () => {
    try {
      const key = 'randomPodcasts';
      const cachedData = localStorage.getItem(key);
      const today = new Date().toISOString().split('T')[0]
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
  
        if (timestamp === today) {
          console.log('Returning cached random podcasts');
          return data;
        }
      }
  
      console.log('Fetching new random podcasts');
      const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/random');
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
      console.error('Error fetching random podcasts:', error);
      throw error;
    }
  };
  
  export default getRandomPodcasts;
  