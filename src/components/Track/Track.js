import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Track.css";

function Track({ track, onAdd, onRemove, isRemoval }) {
  const [removing, setRemoving] = useState(false);

  const handleAdd = () => {
    onAdd(track);
    const element = document.getElementById(track.id);
    element.classList.add("fade-in");
    setTimeout(() => element.classList.remove("fade-in"), 500);
  };

  const handleRemove = () => {
    setRemoving(true);
    const element = document.getElementById(track.id);
    element.classList.add("fade-out");
    setTimeout(() => {
      onRemove(track);
    }, 500); // Remove after the animation
  };

  return (
    <div
      id={track.id}
      className={`Track ${removing ? "removing" : ""} card my-2`}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column align-items-start">
          <h5 className="card-title">{track.name}</h5>
          <p className="card-text">
            {track.artist} | {track.album}
          </p>
          {track.preview_url && (
            <audio controls className="mt-2">
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        {isRemoval ? (
          <button
            className="btn btn-danger"
            onClick={handleRemove}
            aria-label="Remove track from the playlist"
          >
            -
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            aria-label="Add track to the playlist"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

Track.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    preview_url: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired,
};

export default Track;
