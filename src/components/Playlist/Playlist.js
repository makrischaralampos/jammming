import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
  shareableLink,
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert("Playlist link copied to clipboard!");
    });
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
          aria-label="Change the playlist name"
        />
      </div>
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button
        className={`btn btn-success mt-3 w-50 ${
          isSaving ? "scale-up" : ""
        } SaveButton`}
        onClick={handleSave}
        disabled={isSaving}
        aria-label="Save playlist to Spotify"
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
      {shareableLink && (
        <div className="mt-3">
          <p className="text-muted">Share your playlist:</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={shareableLink}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              onClick={copyToClipboard}
              aria-label="Copy link to clipboard"
            >
              Copy Link
            </button>
          </div>
          <div className="d-flex justify-content-around mt-2">
            {/* Social Media Sharing Buttons */}
            <a
              href={`https://twitter.com/intent/tweet/url=${encodeURIComponent(
                shareableLink
              )}&text=Check%20out%20my%20playlist%20on%20Spotify!`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info mt-2"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareableLink
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-2"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

Playlist.propTypes = {
  playlistName: PropTypes.string.isRequired,
  playlistTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  shareableLink: PropTypes.string,
};

export default Playlist;
