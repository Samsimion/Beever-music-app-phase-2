import React from "react";
import { Link } from "react-router-dom"
import styles from "./SongCard.module.css";

function SongCard({ song }) {
  const { trackName, artistName, artworkUrl100, previewUrl,artistId } = song;
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
      console.log("Navigating to artistId:", artistId);
    </div>
  );
}

export default SongCard;
