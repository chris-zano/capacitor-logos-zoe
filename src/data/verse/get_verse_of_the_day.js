export const GetDailyVerse = async () => {
    const url = 'https://beta.ourmanna.com/api/v1/get?format=json&order=daily';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
        const res = await fetch(url, options);
        const json = await res.json();

        const { verse } = json;
        const { reference, text, version, verseurl } = verse.details;
        const { notice } = verse;

        return {
            reference,
            text,
            version,
            verseurl,
            notice
        };
    } catch (err) {
        console.error("Failed to fetch daily verse:", err);
        throw err; // Re-throw the error to let the caller handle it
    }
};

// Use the function
// GetDailyVerse()
//     .then((response) => {
//         console.log("Daily Verse:", response);
//     })
//     .catch((err) => {
//         console.error("Error occurred:", err);
//     });
