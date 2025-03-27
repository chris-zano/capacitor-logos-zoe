const getDevotionalById = async (id) => {
    try {
        const key = `devotional_${id}`;
        const cachedData = localStorage.getItem(key);
        const today = new Date().toISOString().split('T')[0];

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);


            if (timestamp === today) {
                return data;
            }
        }


        const response = await fetch(`https://logos-server-j2ld.onrender.com/devotionals/devotional/${id}`);
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
        console.error(`Error fetching devotional for ID ${id}:`, error);
        throw error;
    }
};

export default getDevotionalById;
