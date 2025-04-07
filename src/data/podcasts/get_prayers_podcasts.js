import BASEURL from "../../baseUrl.js";

const getPrayersPodcasts = async () => {
    try {
        const key = 'prayers';
        const cachedData = localStorage.getItem(key);
        const now = new Date().getTime();

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);


            if (now - timestamp < 3600000) {
                console.log('Returning cached prayers podcasts');
                return data;
            }
        }


        console.log('Fetching new prayers podcasts');
        const response = await fetch(`${BASEURL}/podcasts/prayers`);
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
        console.error('Error fetching prayers podcasts:', error);
        throw error;
    }
};

export default getPrayersPodcasts;
