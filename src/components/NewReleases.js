// src/components/NewReleases.js
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

function NewReleases() {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=new&media=music")
      .then((res) => res.json())
      .then((data) => setNewReleases(data.results));
  }, []);

  return (
    <section>
      <h3>🆕 New Releases</h3>
      <SongList songs={newReleases} />
    </section>
  );
}

export default NewReleases;
