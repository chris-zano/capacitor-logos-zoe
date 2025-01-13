import React, { useEffect, useState } from 'react';

function BibleContents() {
    const [bibleContents, setBibleContents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBibleContents = async () => {
            try {
                const response = await fetch('https://bible-api.com/books');
                if (!response.ok) {
                    throw new Error(`Error fetching Bible contents: ${response.statusText}`);
                }
                const data = await response.json();

                // Assuming the API provides an array of books with "name" and "chapters" fields
                if (data.books) {
                    setBibleContents(data.books);
                } else {
                    throw new Error('Unexpected data format from API.');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBibleContents();
    }, []);

    return (
        <>
            <h1 className="poppins-regular">Bible App</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="bible-contents">
                    {bibleContents.length === 0 ? (
                        <p>Loading contents...</p>
                    ) : (
                        <ul>
                            {bibleContents.map((book, index) => (
                                <li key={index}>
                                    <strong>{book.name}</strong> - {book.chapters.length} chapters
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
}

export default BibleContents;
