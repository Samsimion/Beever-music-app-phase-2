import React, {useState} from "react";

function CreatePlaylist({ onPlaylistCreated }) {
    const [name, setName] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch("http://localhost:3000/playlists", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, tracks: [] })
      })
      .then(res => res.json())
      .then(newPlaylist => {
        onPlaylistCreated(newPlaylist);
        setName(""); // clear input
      });
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Playlist name"
        />
        <button type="submit">Create Playlist</button>
      </form>
    );
  }export default CreatePlaylist;
  