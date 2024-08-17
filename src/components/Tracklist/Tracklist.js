import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function Tracklist() {
  return (
    <div className="Tracklist">
      {/* This is where Track components will be rendered */}
      <Track />
      <Track />
      <Track />
    </div>
  );
}

export default Tracklist;
