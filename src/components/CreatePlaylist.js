import React, { useState } from "react";
import "./CreatePlaylist.css";

//playlist by sam

function CreatePlaylist({ onPlaylistCreated }) {
    const [name, setName] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/playlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, tracks: [] })
        })
        .then(res => res.json())
        .then(newPlaylist => {
            onPlaylistCreated(newPlaylist);
            setName("");
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 1000);
        });
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className={`createPlaylistForm ${isSuccess ? "success" : ""}`}
        >
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="New playlist name"
                required
            />
            <button type="submit">Create Playlist</button>
        </form>
    );
}

export default CreatePlaylist;