const getPrayersPodcasts = async () => {
    try {
        const key = 'prayers';
        const cachedData = localStorage.getItem(key);
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            // Check if the cached timestamp is the same as today's date
            if (timestamp === today) {
                console.log('Returning cached prayers podcasts');
                return data;
            }
        }

        // Fetch new WOF podcasts if no valid cache is found
        console.log('Fetching new prayers podcasts');
        const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/prayers');
        const data = await response.json();

        // Store the new WOF podcasts with today's timestamp in local storage
        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                timestamp: today,
            })
        );

        return data;
    } catch (error) {
        console.error('Error fetching prayers podcasts:', error);
        throw error;
    }
};

export default getPrayersPodcasts;
