import React, { useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  
  const toggleFavorite = (song) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some(fav => fav.trackName === song.trackName)) {
        return prevFavorites.filter(fav => fav.trackName !== song.trackName);
      }
      return [...prevFavorites, song];
    });
  };

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((song, index) => (
          <li key={index}>
            {song.trackName} by {song.artistName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
