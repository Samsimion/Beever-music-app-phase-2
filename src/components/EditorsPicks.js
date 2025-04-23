// src/components/EditorsPicks.js
import React, { useEffect, useState } from "react";
import SongList from "./SongList";

function EditorsPicks() {
  const [editorPicks, setEditorPicks] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=editor&media=music")
      .then((res) => res.json())
      .then((data) => setEditorPicks(data.results));
  }, []);

  return (
    <section>
      <h3>🎧 Editor’s Picks</h3>
      <SongList songs={editorPicks} />
    </section>
  );
}

export default EditorsPicks;
