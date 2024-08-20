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
import { useSpotifySearch } from "../../hooks/useSpotifySearch";
import { usePlaylist } from "../../hooks/usePlaylist";

const SearchResults = lazy(() => import("../SearchResults/SearchResults"));
const Playlist = lazy(() => import("../Playlist/Playlist"));

function App() {
  // State hooks
  const [theme, setTheme] = useState("light-theme");
  const [shareableLink, setShareableLink] = useState("");
  const { searchResults, error, isLoading, search } = useSpotifySearch();
  const {
    playlistName,
    playlistTracks,
    addTrack,
    removeTrack,
    updatePlaylistName,
    resetPlaylist,
  } = usePlaylist();

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

  const savePlaylist = useCallback(() => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then((playlistId) => {
      resetPlaylist();

      const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
      setShareableLink(playlistUrl);

      alert("Playlist saved and ready to share!");
    });
  }, [playlistName, playlistTracks, resetPlaylist]);

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
          <button
            className="btn btn-outline-secondary"
            onClick={toggleTheme}
            aria-label="Change from light to dark mode and vice versa"
          >
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
