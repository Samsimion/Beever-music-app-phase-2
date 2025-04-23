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
import GenreFilter from "./components/GenreFilter";
import Favorites from "./components/Favorites";

function App() {
  const [songs, setSongs] = useState([]);
 

  function getGenreNameFromSearchTerm(term) {
    const map = {
      "hip hop music": "hip-hop",
      rnb: "r&b",
      "top pop hits": "pop",
      "classic rock": "rock",
      afrobeat: "afrobeats",
      "smooth jazz": "jazz",
      country: "country"
    };
    return map[term] || "";
  }
  


  function handleSearch(term) {
    fetch(`https://itunes.apple.com/search?term=${term}&media=music`)
      .then((res) => res.json())
      .then((data) => setSongs(data.results));
  }
  function handleGenreSelect(genreSearchTerm) {
    fetch(`https://itunes.apple.com/search?term=${genreSearchTerm}&media=music`)
      .then((res) => res.json())
      .then((data) => {
        const genreName = getGenreNameFromSearchTerm(genreSearchTerm); // see below
        const filtered = data.results.filter(
          (track) => track.primaryGenreName && track.primaryGenreName.toLowerCase().includes(genreName.toLowerCase())
        );
        setSongs(filtered);
      });
  }

  function handleAddToFavorites(song) {
    fetch(`http://localhost:3000/favorites?trackId=${song.trackId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          fetch("http://localhost:3000/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
          });
        }
      });
  }
  
  
  

  return (
    <Router>
      <div className="App">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <GenreFilter onGenreSelect={handleGenreSelect} />

        <h2>Search Results</h2>

        

        <Routes>
          <Route
            path="/"
            element={
              <>
                <p>Discover trending tracks, featured artists, and editor’s picks!</p>
                <SongList songs={songs} onAddToFavorites={handleAddToFavorites}/>
                <Trending onAddToFavorites={handleAddToFavorites} />
                <PopularArtists onAddToFavorites={handleAddToFavorites} />
                <NewReleases onAddToFavorites={handleAddToFavorites} />
                <EditorsPicks onAddToFavorites={handleAddToFavorites}/>
              </>
            
            }
          />

            <Route path="/artist/:id" element={<ArtistPage/>} />
            

           <Route path="/favorites" element={<Favorites onAddToFavorites={handleAddToFavorites} />}  />

      </Routes>

      

    </div>
  </Router>
  
);
}

export default App;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         