import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
}) {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;
