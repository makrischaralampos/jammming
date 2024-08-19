import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./App.css";
import "../../styles/themes.css"; // Import my custom themes
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";

const SearchResults = lazy(() => import("../SearchResults/SearchResults"));
const Playlist = lazy(() => import("../Playlist/Playlist"));

function App() {
  // State hooks
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [error, setError] = useState(null); // New state for error messages
  const [theme, setTheme] = useState("light-theme");
  const [shareableLink, setShareableLink] = useState("");

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
  const addTrack = useCallback(
    (track) => {
      if (!playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
        setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      }
    },
    [playlistTracks]
  );

  // Function to remove a track from the playlist
  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  }, []);

  // Function to update the playlist name
  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then((playlistId) => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);

      const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
      setShareableLink(playlistUrl);

      alert("Playlist saved and ready to share!");
    });
  }, [playlistName, playlistTracks]);

  const search = useCallback((term, filter) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous error
    Spotify.search(term, filter)
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

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);
  const memoizedPlaylistTracks = useMemo(
    () => playlistTracks,
    [playlistTracks]
  );

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
          <Suspense fallback={<div>Loading...</div>}>
            <div className="col-md-6">
              <SearchResults
                searchResults={memoizedSearchResults}
                onAdd={addTrack}
                isLoading={isLoading} // Pass loading state as a prop
                error={error}
              />
            </div>
            <div className="col-md-6">
              <Playlist
                playlistName={playlistName}
                playlistTracks={memoizedPlaylistTracks}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlaylist} // Trigger the savePlaylist function
                shareableLink={shareableLink}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
