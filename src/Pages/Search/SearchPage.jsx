import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import getSearchData from "../../data/search/search.js"; // Import your search data fetching function
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner.jsx";

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
        setLoading(false);
      } catch (err) {
        setError("Error loading search results");
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
        result.content.toLowerCase().includes(input),
    );

    setFilteredResults(filtered);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Search Bar */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          style={{
            width: '90vw',
            margin: '10px',
            padding: '1rem 0',
            fontSize: '16px',
            textIndent: '1ch',
            borderRadius: '50px',
            outline: 'none',
            border: '1px solid var(--light-gray)',
            fontFamily: 'Inter',
            color: 'var(--text)',
            backgroundColor: 'var(--card-background)',
          }}
        />
      </div>

      {/* Search Results */}
      {query && (
        <div style={{ marginTop: "20px" }}>
          {filteredResults.length === 0 ? (
            <p style={{ color: 'var(--text)' }}>No results found</p>
          ) : (
            filteredResults.map(result => (
              <div key={result.id} style={{ marginBottom: '15px' }}>
                <NavLink to={`/${result.type}s/${result.type}/${result.id}`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      width: '90vw',
                      backgroundColor: 'var(--card-background)',
                      borderRadius: '2ch'
                    }}
                  >
                    <img src={result.image} alt={result.title} style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {result.title.length > 20
                          ? `${result.title.slice(0, 20)}...`
                          : result.title}
                      </h3>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;
