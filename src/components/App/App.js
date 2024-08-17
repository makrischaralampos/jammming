import React, { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
  // State hooks
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Track 1",
      artist: "Artist 1",
      album: "Album 1",
      uri: "spotify:track:1",
    },
    {
      id: 2,
      name: "Track 2",
      artist: "Artist 2",
      album: "Album 2",
      uri: "spotify:track:2",
    },
    {
      id: 3,
      name: "Track 3",
      artist: "Artist 3",
      album: "Album 3",
      uri: "spotify:track:3",
    },
  ]);

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

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

    console.log(`Saving playlist: ${playlistName}`);
    console.log(`Track URIs: ${trackURIs.join(", ")}`);

    // Simulate saving the playlist
    // (In a real scenario, this would be an API call to Spotify)

    // Reset playlist after saving
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
