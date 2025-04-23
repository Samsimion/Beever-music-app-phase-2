// src/components/Trending.js
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=trending&media=music")
      .then((res) => res.json())
      .then((data) => setTrending(data.results));
  }, []);

  return (
    <section>
      <h3>🔥 Trending Now</h3>
      <SongList songs={trending} />
    </section>
  );
}

export default Trending;
