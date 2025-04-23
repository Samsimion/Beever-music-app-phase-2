import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import ArtistPage from "./components/ArtistPage";
import Header from "./components/Header";
import Trending from "./components/Trending";
import PopularArtists from "./components/PopularArtists";
import NewReleases from "./components/NewReleases";
import EditorsPicks from "./components/EditorsPicks";

function App() {
  const [songs, setSongs] = useState([]);
 


  function handleSearch(term) {
    fetch(`https://itunes.apple.com/search?term=${term}&media=music`)
      .then((res) => res.json())
      .then((data) => setSongs(data.results));
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <SearchBar onSearch={handleSearch} />

        <h2>Search Results</h2>
        

        <Routes>
          <Route
            path="/"
            element={
              <>
                <p>Discover trending tracks, featured artists, and editor’s picks!</p>
                <SongList songs={songs}/>
                <Trending />
                <PopularArtists />
                <NewReleases />
                <EditorsPicks />
              </>
            
            }
          />

            <Route path="/artist/:id" element={<ArtistPage/>} />
        </Routes>

        

      </div>
    </Router>
    
  );
}

export default App;