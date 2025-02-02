import BASEURL from "../../baseUrl.js";

const getBookAndChapterVerses = async ({ book, chapter }) => {
    try {
        const key = `${book}_${chapter}_verses`;
        const cachedData = localStorage.getItem(key);
        const now = new Date().getTime();
        const oneWeek = 604800000;

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            if (now - timestamp < oneWeek) {
                console.log('Returning cached book chapter verses');
                return data;
            }
        }
        console.log(`Fetching ${book}_chapters`);

        const response = await fetch(`${BASEURL}/bible/verses/${book}/${chapter}`);
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
        console.error(`Error fetching verses for ${book} ${chapter}:`, error);
        throw error;
    }
};

export default getBookAndChapterVerses;
