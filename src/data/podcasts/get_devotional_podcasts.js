import BASEURL from "../../baseUrl.js";

const getDevotionalsPodcasts = async () => {
    try {
        const key = 'devotionalsPodcasts';
        const cachedData = localStorage.getItem(key);
        const now = new Date().getTime();

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);


            if (now - timestamp < 3600000) {
                return data;
            }
        }


        const response = await fetch(`${BASEURL}/podcasts/devotionals`);
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
        console.error('Error fetching devotionals podcasts:', error);
        throw error;
    }
};

export default getDevotionalsPodcasts;
