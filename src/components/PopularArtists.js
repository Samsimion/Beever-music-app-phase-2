// src/components/PopularArtists.js
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

function PopularArtists({ onAddToFavorites,  onAddToPlaylist, playlists }) {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=popular&media=music")
      .then((res) => res.json())
      .then((data) => setPopular(data.results));
  }, []);

  return (
    <section>
      <h3>⭐ Popular Artists</h3>
      <SongList songs={popular} onAddToFavorites={onAddToFavorites} onAddToPlaylist={onAddToPlaylist} playlists={playlists} />
    </section>
  );
}

export default PopularArtists;                                