import React, { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/favorites/${id}`, {
      method: "DELETE",
    }).then(() => {
      setFavorites(favorites.filter((song) => song.id !== id));
    });
  }

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.map((song) => (
        <div key={song.id}>
          <p>{song.trackName} by {song.artistName}</p>
          <button onClick={() => handleDelete(song.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
