import React, { useEffect, useState } from 'react';
import getSymbols from '../../data/articles/get_symbols.js'; // Adjust path as needed

const Symbols = () => {
    const [symbols, setSymbols] = useState([]);

    // Fetch symbols when the component mounts
    useEffect(() => {
        const fetchSymbols = async () => {
            const data = await getSymbols();
            setSymbols(data); // Set the symbols data to state
        };

        fetchSymbols();
    }, []); // Empty array ensures this runs once after the initial render

    // If no symbols, render nothing or a loading message
    if (!symbols || symbols.length === 0) {
        return null; // or a loading message if you prefer
    }

    return (
        <section id="symbols">
            <div className="podcast-header">
                <h2 className="section-title">Dream Symbols & Meanings</h2>
                <div>
                    <a href="/categories/category/6738d8443f1e3fb8e113c0b9">
                        <span>See More</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <div className="symbols-list">
                {symbols.map((symbol) => (
                    <a key={symbol._id} href={`/articles/article/${symbol._id}/`} className="related-article-card">
                        <img src={symbol.article_image} alt={symbol.article_title} />
                        <div className="article-details">
                            <h3>{symbol.article_title}</h3>
                            <small>
                                {new Date(symbol.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </small>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Symbols;
