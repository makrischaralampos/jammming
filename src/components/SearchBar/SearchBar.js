import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const search = async () => {
    setIsLoading(true);
    await onSearch(term);
    setIsLoading(false);
  };

  return (
    <div className="SearchBar mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a song, album, or artist"
          value={term}
          onChange={handleTermChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success d-flex align-items-center"
            onClick={search}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
