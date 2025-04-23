import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";


function Favorites({ onAddToFavorites }) {
  const [favorites, setFavorites] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");


  useEffect(() => {
    fetch("http://localhost:3000/favorites")
      .then((res) => res.json())
      .then((data) => { console.log(data); setFavorites(data)});
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
    return a[sortBy].localeCompare(b[sortBy]);
  });


  return (
    <div>
      <h2>Your Favorites</h2>
      <div>
          <label>Filter by Genre:</label>
          <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
            <option value="All">All</option>
            {[...new Set(favorites.map((f) => f.primaryGenreName))].map((genre) => (                
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="None">None</option>
            <option value="trackName">Title</option>
            <option value="artistName">Artis                                                                                                                                                                                                                                                                                                                                                                                t</option>
          </select>
      </div>

                        
      {filteredFavorites.map((song) => (
        <div key={song.id}>
          <p>{song.trackName} by {song.artistName}</p>
          <SongCard song={song} onAddToFavorites={onAddToFavorites} />
          <button onClick={() => handleDelete(song.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
