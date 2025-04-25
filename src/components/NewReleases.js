// src/components/NewReleases.js
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

// This component fetches new releases from the iTunes API and displays them
function NewReleases({ onAddToFavorites,  onAddToPlaylist, playlists}) {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=new&media=music")
      .then((res) => res.json())
      .then((data) => setNewReleases(data.results));
  }, []);
 
  return (
    <section>
      <h3>🆕 New Releases</h3>
      <SongList songs={newReleases}  onAddToFavorites={onAddToFavorites} onAddToPlaylist={onAddToPlaylist} playlists={playlists}/>
    </section>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  );
}

export default NewReleases;
