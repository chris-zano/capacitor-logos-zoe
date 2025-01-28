import React, { useEffect, useState } from 'react';
import getBibleBooks from '../../data/bible/get_books.js';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

function BibleContents() {
    const [bibleContents, setBibleContents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBibleContents = async () => {
            try {
                const data = await getBibleBooks();
                console.log({ data });
                // Assuming the API provides an array of books with "name" and "chapters" fields
                if (data && data.books) {
                    setBibleContents(Array.from(data.books).sort((a, b) => a > b ? 1 : -1));
                } else {
                    throw new Error('Unexpected data format from API.');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBibleContents();
    }, []);

    console.log({ bibleContents });

    return (
        <>
            <header>
                <div id="read-appbar">
                    <div className="row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 3ch 0 1ch' }}>
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span
                            className='poppins-regular'
                            style={{
                                marginLeft: '1ch',
                            }}
                            >Books</span>
                        </button>
                    </div>
                </div>
            </header>
            <main style={{
                marginTop: '3.2rem',
                // padding: '0 1.5ch',
            }}>

                {error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="bible-contents">
                        {bibleContents.length === 0 ? (
                            <p>Loading contents...</p>
                        ) : (
                            <ul
                                style={{
                                    padding: 'unset',
                                    margin: 'unset',
                                }}
                            >
                                {bibleContents.map((book, index) => (
                                    <li key={index}
                                    className='poppins-regular'
                                        style={{
                                            padding: '1.5rem',
                                            borderBottom: '1px solid rgb(210 209 209 / 36%)',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                            fontWeight: '500',
                                            fontSize: '1.2rem',
                                            listStyle: 'none',
                                        }}
                                    >
                                        <NavLink to="/">
                                            <span>{book}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </main>

        </>
    );
}

export default BibleContents;
