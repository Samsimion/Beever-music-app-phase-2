// src/components/Trending.js
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

//holaaaaaa
function Trending({onAddToFavorites, onAddToPlaylist, playlists}){
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=trending&media=music")
      .then((res) => res.json())
      .then((data) => setTrending(data.results));
  }, []);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

  return (
    <section>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      <h3>🔥 Trending Now.</h3>
      <SongList songs={trending} onAddToFavorites={onAddToFavorites} onAddToPlaylist={onAddToPlaylist} playlists={playlists}/>
    </section>
  );
}

export default Trending;
