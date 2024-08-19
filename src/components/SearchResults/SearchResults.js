import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";
import { Puff } from "react-loader-spinner"; // Import the spinner component

function SearchResults({ searchResults, onAdd, isLoading, error }) {
  return (
    <div className="SearchResults">
      <h2 className="text-center">Results</h2>
      {isLoading && (
        <Puff
          type="Puff"
          color="#1DB954"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && (
        <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      )}
    </div>
  );
}

export default SearchResults;
