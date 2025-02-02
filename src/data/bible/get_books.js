import BASEURL from "../../baseUrl.js";

const getBibleBooksChronological = async () => {
    try {
        const key = "bible_books_chronological";
        const cachedData = localStorage.getItem(key);
        const now = new Date().getTime();
        const oneWeek = 604800000;

        const chronologicalOrder = [
            "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
            "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
            "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
            "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
            "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
            "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
            "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
            "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew",
            "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
            "2 Corinthians", "Galatians", "Ephesians", "Philippians",
            "Colossians", "1 Thessalonians", "2 Thessalonians",
            "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
            "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
            "Jude", "Revelation"
        ];

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            if (now - timestamp < oneWeek) {
                console.log('Returning cached bible books (chronological)');
                return data;
            }
        }
        console.log("Fetching bible_books");

        const response = await fetch(`${BASEURL}/bible/books`);
        const data = await response.json();

        const sortedData = data.books.sort((a, b) => {
            return chronologicalOrder.indexOf(a) - chronologicalOrder.indexOf(b);
        });

        localStorage.setItem(
            key,
            JSON.stringify({
                data: sortedData,
                timestamp: now,
            })
        );
        return sortedData;
    } catch (error) {
        console.error('Error fetching bible_books:', error);
        throw error;
    }
}

export default getBibleBooksChronological;
