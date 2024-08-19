import { useState, useCallback } from "react";
import Spotify from "../util/Spotify";

export const useSpotifySearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback((term) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous error
    Spotify.search(term)
      .then((tracks) => {
        setSearchResults(tracks);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Search failed:", error);
        setError("Failed to fetch results. Please try again."); // Set error message
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return { searchResults, error, isLoading, search };
};
