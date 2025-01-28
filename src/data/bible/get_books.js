import BASEURL from "../../baseUrl.js";

const getBibleBooks = async () => {
    try {
        const key = "bible_books";
        const cachedData = localStorage.getItem(key);
        const today = new Date().toISOString().split('T')[0];

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            if (timestamp === today) {
                console.log('Returning cached bible books');
                return data;
            }
        }
        console.log("Fetching bible_books");

        const response = await fetch(`${BASEURL}/bible/books`);
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
        console.error('Error fetching bible_books:', error);
        throw error;
    }
}

export default getBibleBooks;