import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";
import styles from "./favorite.css"; // Import your CSS module

function Favorites({ onAddToFavorites, onAddToPlaylist, playlists }) {
  const [favorites, setFavorites] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");

  useEffect(() => {
    fetch("http://localhost:3000/favorites")
      .then((res) => res.json())
      .then((data) => { console.log(data); setFavorites(data) });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/favorites/${id}`, {
      method: "DELETE",
    }).then(() => {
      setFavorites(favorites.filter((song) => song.id !== id));
    });
  }

  const filteredFavorites = favorites
    .filter((song) => genreFilter === "All" || song.primaryGenreName === genreFilter)
    .sort((a, b) => {
      if (sortBy === "None") return 0;
      const valA = a[sortBy] || "";
      const valB = b[sortBy] || "";
      return valA.localeCompare(valB);
    });

  return (
    <div className={styles.container}>
      <h2>Your Favorites</h2>
      <div className={styles.filterSection}>
        <div>
          <label>Filter by Genre:</label>
          <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
            <option value="All">All</option>
            {[...new Set(favorites.map((f) => f.primaryGenreName))].map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="None">None</option>
            <option value="trackName">Title</option>
            <option value="artistName">Artist</option>
          </select>
        </div>
      </div>

      <div className={styles.songList}>
        {filteredFavorites.map((song) => (
          <div key={song.id} className={styles.songCardWrapper}>
            <div className={styles.songDetails}>
              <p className={styles.songTitle}>{song.trackName}</p>
              <p className={styles.artistName}>{song.artistName}</p>
            </div>
            <SongCard song={song} onAddToFavorites={onAddToFavorites} onAddToPlaylist={onAddToPlaylist} playlists={playlists} />
            <button className={styles.removeButton} onClick={() => handleDelete(song.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
