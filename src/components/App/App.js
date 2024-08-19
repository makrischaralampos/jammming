import React, { useEffect, useState } from "react";
import "./App.css";
import "../../styles/themes.css"; // Import my custom themes
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

function App() {
  // State hooks
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [error, setError] = useState(null); // New state for error messages
  const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    Spotify.getAccessToken();
    // Set theme from localStorage if available
    const savedTheme = localStorage.getItem("theme") || "light-theme";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  // Function to add a track to the playlist
  const addTrack = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  // Function to remove a track from the playlist
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  };

  // Function to update the playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  const search = (term) => {
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
  };

  return (
    <div className="App">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1 className="text-center">Jammming</h1>
          <button className="btn btn-outline-secondary" onClick={toggleTheme}>
            {theme === "light-theme" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <SearchBar onSearch={search} />
        <div className="row">
          <div className="col-md-6">
            <SearchResults
              searchResults={searchResults}
              onAdd={addTrack}
              isLoading={isLoading} // Pass loading state as a prop
              error={error}
            />
          </div>
          <div className="col-md-6">
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist} // Trigger the savePlaylist function
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
