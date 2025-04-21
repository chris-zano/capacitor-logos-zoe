import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import getSearchData from "../../data/search/search.js";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner.jsx";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const data = await getSearchData();
        setSearchResults(data.search_data);
        setFilteredResults(data.search_data);
      } catch (err) {
        setError("Error loading search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchData();
  }, []);

  const handleSearch = (event) => {
    const input = event.target.value.toLowerCase();
    setQuery(input);

    const filtered = searchResults.filter(
      (result) =>
        result.title.toLowerCase().includes(input) ||
        result.content.toLowerCase().includes(input)
    );
    console.log({filtered});

    setFilteredResults(filtered);
  };

  return (
    <div className="search-page">
      {/* Fixed Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="search-input"
          aria-label="Search"
        />
      </div>

      {/* Loader */}
      {loading && (
        <div className="loader-container">
          <div className="loader" />
          <p className="loader-text">Getting things ready for you...</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="error-message">{error}</div>}

      {/* Search Results */}
      {!loading && query && (
        <div className="results-container">
          {filteredResults.length === 0 ? (
            <p className="no-results">No results found</p>
          ) : (
            filteredResults.map((result) => (
              <NavLink
                key={result.id}
                to={`/${result.type}s/${result.type}/${result.id}`}
                className="result-card"
              >
                <img
                  src={result.image}
                  alt={result.title}
                  className="result-image"
                />
                <div className="result-info">
                  <h3 className="result-title">
                    {result.title.length > 30
                      ? result.title.slice(0, 30) + "..."
                      : result.title}
                  </h3>
                </div>
              </NavLink>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
