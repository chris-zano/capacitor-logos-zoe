const getPrayersPodcasts = async () => {
    try {
        const key = 'prayers';
        const cachedData = localStorage.getItem(key);
        const now = new Date().getTime(); // Get current time in milliseconds

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            // Check if the cached data is still within the last hour
            if (now - timestamp < 3600000) {
                console.log('Returning cached prayers podcasts');
                return data;
            }
        }

        // Fetch new prayers podcasts if no valid cache is found
        console.log('Fetching new prayers podcasts');
        const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/prayers');
        const data = await response.json();

        // Store the new prayers podcasts with the current timestamp in local storage
        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                timestamp: now, // Store the current time
            })
        );

        return data;
    } catch (error) {
        console.error('Error fetching prayers podcasts:', error);
        throw error;
    }
};

export default getPrayersPodcasts;
