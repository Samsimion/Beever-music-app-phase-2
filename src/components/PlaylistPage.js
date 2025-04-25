import React, { useEffect, useState } from "react";
import CreatePlaylist from "./CreatePlaylist";
import SongCard from "./SongCard";
import styles from "./PlaylistPage.module.css";

//crud for playlist

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  function handleNewPlaylist(playlist) {
    setPlaylists((prev) => [...prev, playlist]);
  }

  function handleRemoveTrack(playlistId, trackIndex) {
    const playlist = playlists.find((pl) => pl.id === playlistId);
    const updatedTracks = playlist.tracks.filter((_, i) => i !== trackIndex);

    fetch(`http://localhost:3000/playlists/${playlistId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracks: updatedTracks }),
    })
      .then((res) => res.json())
      .then((updatedPlaylist) => {
        setPlaylists((prev) =>
          prev.map((pl) => (pl.id === playlistId ? updatedPlaylist : pl))
        );
      });
  }

  function handleDeletePlaylist(id) {
    fetch(`http://localhost:3000/playlists/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlaylists((prev) => prev.filter((pl) => pl.id !== id));
    });
  }

  function handleNameChange(id, newName) {
    fetch(`http://localhost:3000/playlists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((res) => res.json())
      .then((updatedPlaylist) => {
        setPlaylists((prev) =>
          prev.map((pl) => (pl.id === id ? updatedPlaylist : pl))
        );
      });
  }

  const PlaylistItem = ({ playlist }) => {
    const [tempName, setTempName] = useState(playlist.name);
    const [isEditing, setIsEditing] = useState(false);

    function handleSave() {
      if (tempName !== playlist.name) {
        handleNameChange(playlist.id, tempName);
      }
      setIsEditing(false);
    }

    return (
      <li className={styles.playlistItem}>
        <div className={styles.playlistHeader}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleSave}
                autoFocus
              />
              <button onClick={handleSave}>✅</button>
            </>
          ) : (
            <>
              <span className={styles.playlistName}>{playlist.name}</span>
              <button onClick={() => setIsEditing(true)}>✏️</button>
            </>
          )}
          <button onClick={() => handleDeletePlaylist(playlist.id)}>🗑️</button>
        </div>

        {playlist.tracks.length > 0 && (
          <ul className={styles.tracksList}>
            {playlist.tracks.map((track, i) => (
              <li key={i}>
                <SongCard
                  song={track}
                  playlists={playlists}
                  onAddToFavorites={() => {}}
                  onAddToPlaylist={() => {}}
                />
                <button onClick={() => handleRemoveTrack(playlist.id, i)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Your Playlists</h2>
      <CreatePlaylist onPlaylistCreated={handleNewPlaylist} />
      <ul className={styles.playlistList}>
        {playlists.map((playlist) => (
          <PlaylistItem key={playlist.id} playlist={playlist} />
        ))}
      </ul>
    </div>
  );
}

export default PlaylistPage;
