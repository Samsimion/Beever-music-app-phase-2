import React from 'react';
import styles from "./Player.module.css";

function Player({ previewUrl, trackName }) {
  if (!previewUrl) return null;

  return (
    <div className={styles.player}>
      <h3>Now Playing: {trackName}</h3>
      <audio controls>
        <source src={previewUrl} type="audio/m4a" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Player;
