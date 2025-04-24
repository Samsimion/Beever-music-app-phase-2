import React, { useState } from "react";
import { Link } from "react-router-dom"
import styles from "./SongCard.module.css";

function SongCard({ song  , onAddToFavorites, onAddToPlaylist, playlists}) {
  const { trackName, artistName, artworkUrl100, previewUrl,artistId } = song;
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleAdd = () => {
    if (selectedPlaylist) {
      onAddToPlaylist(song, selectedPlaylist);
    }
  };

  return (
    <div className={styles.songCard}>
      <img src={artworkUrl100} alt={trackName} />
      <h3>{trackName}</h3>
      <p>{artistName}</p>

      {/* Link to the ArtistPage */}
      <Link to={`/artist/${artistId}`}>
        <button>Go to Artist</button>
      </Link>
      {previewUrl && (
        <audio controls src={previewUrl}>
          Your browser does not support the audio tag.
        </audio>
        

      )}
      {/*mkuu fav utton*/}
      <button onClick={() => onAddToFavorites(song)}>❤️ Favorite</button>
      <div>
        <select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option value="">Add to Playlist</option>
          {playlists && playlists.map((pl) => (
            <option key={pl.id} value={pl.id}>
              {pl.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>➕</button>
      </div>
    </div>
  );
}

export default SongCard;
