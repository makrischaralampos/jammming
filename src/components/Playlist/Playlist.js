import React, { useState } from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  return (
    <div className="Playlist card p-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control text-center"
          value={playlistName}
          onChange={handleNameChange}
          placeholder="Playlist Name"
        />
      </div>
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button
        className={`btn btn-success mt-3 w-50 ${
          isSaving ? "scale-up" : ""
        } SaveButton`}
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
        ) : null}
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;
