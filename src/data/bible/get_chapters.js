import BASEURL from "../../baseUrl.js";

const getBookChapters = async ({book}) => {
    try {
        const key = `${book}_chapters`;
        const cachedData = localStorage.getItem(key);
        const today = new Date().toISOString().split('T')[0];

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            if (timestamp === today) {
                console.log('Returning cached book chapters');
                return data;
            }
        }
        console.log(`Fetching ${book}_chapters`);

        const response = await fetch(`${BASEURL}/bible/chapters/${book}`);
        const data = await response.json();

        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                timestamp: today,
            })
        )
        return data;
    } catch (error) {
        console.error(`Error fetching chapters for ${book}:`, error);
        throw error;
    }
}

export default getBookChapters;