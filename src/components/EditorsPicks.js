
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

function EditorsPicks({onAddToFavorites, onAddToPlaylist, playlists}) {
  const [editorPicks, setEditorPicks] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=editor&media=music")
      .then((res) => res.json())
      .then((data) => setEditorPicks(data.results));
  }, []);
 
  return (
    <section>
      <h3>🎧 Editor’s Picks.</h3>
      <SongList songs={editorPicks} onAddToFavorites={onAddToFavorites} onAddToPlaylist={onAddToPlaylist} playlists={playlists} />
    </section>
  );
}

export default EditorsPicks;
