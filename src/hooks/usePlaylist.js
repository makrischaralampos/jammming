import { useState, useCallback } from "react";

export const usePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

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

  const resetPlaylist = useCallback(() => {
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  }, []);

  return {
    playlistName,
    playlistTracks,
    addTrack,
    removeTrack,
    updatePlaylistName,
    resetPlaylist,
  };
};
