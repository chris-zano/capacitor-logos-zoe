const getDevotionalById = async (id) => {
    try {
        const key = `devotional_${id}`;
        const cachedData = localStorage.getItem(key);
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            // Check if the cached timestamp is the same as today's date
            if (timestamp === today) {
                console.log(`Returning cached devotional for ID: ${id}`);
                return data;
            }
        }

        // Fetch new devotional if no valid cache is found
        console.log(`Fetching new devotional for ID: ${id}`);
        const response = await fetch(`https://logos-server-j2ld.onrender.com/devotionals/devotional/${id}`);
        const data = await response.json();

        // Store the new devotional with today's timestamp in local storage
        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                timestamp: today,
            })
        );

        return data;
    } catch (error) {
        console.error(`Error fetching devotional for ID ${id}:`, error);
        throw error;
    }
};

export default getDevotionalById;
