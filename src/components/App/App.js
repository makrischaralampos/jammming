import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

const searchResults = [
  {
    id: 1,
    name: "Track 1",
    artist: "Artist 1",
    album: "Album 1",
  },
  {
    id: 2,
    name: "Track 2",
    artist: "Artist 2",
    album: "Album 2",
  },
  {
    id: 3,
    name: "Track 3",
    artist: "Artist 3",
    album: "Album 3",
  },
];

function App() {
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
