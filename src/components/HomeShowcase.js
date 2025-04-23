// src/components/HomeShowcase.js
import React from "react";
import styles from "./HomeShowcase.module.css";

function HomeShowcase() {
  return (
    <div className={styles.showcase}>
      <h2>🎶 Welcome to Beever Music</h2>
      <p>Discover trending tracks, featured artists, and editor’s picks!</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>🔥 Trending Now</h3>
          <p>Top hits taking over the charts.</p>
        </div>
        <div className={styles.card}>
          <h3>⭐ Popular Artists</h3>
          <p>Your favorites and rising stars.</p>
        </div>
        <div className={styles.card}>
          <h3>🆕 New Releases</h3>
          <p>Fresh drops you need to hear.</p>
        </div>
        <div className={styles.card}>
          <h3>🎧 Editor’s Picks</h3>
          <p>Carefully curated for you.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeShowcase;
