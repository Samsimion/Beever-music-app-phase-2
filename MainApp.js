import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import CreatePlaylist from "./components/CreatePlaylist";
import PlaylistPage from "./components/PlaylistPage";
import './App.css'


function MainApp() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:3000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

 

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
      .then((data) => {setSongs(data.results);  navigate("/");   });
  }
  function handleGenreSelect(genreSearchTerm) {
    fetch(`https://itunes.apple.com/search?term=${genreSearchTerm}&media=music`)
      .then((res) => res.json())
      .then((data) => {
        const genreName = getGenreNameFromSearchTerm(genreSearchTerm); 
        const filtered = data.results.filter(
          (track) => track.primaryGenreName && track.primaryGenreName.toLowerCase().includes(genreName.toLowerCase())
        );
        setSongs(filtered);
        navigate("/");
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

  function handleAddToPlaylist(song, playlistId) {
    fetch(`http://localhost:3000/playlists/${playlistId}`)
      .then(res => res.json())
      .then(playlist => {
        const exists = playlist.tracks.some(track => track.trackId === song.trackId);
        if (!exists) {
          const updatedPlaylist = {
            ...playlist,
            tracks: [...playlist.tracks, song]
          };
          fetch(`http://localhost:3000/playlists/${playlistId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPlaylist)
          })
          .then(() => {
            fetch("http://localhost:3000/playlists")
              .then(res => res.json())
              .then(data => setPlaylists(data));
          });
        }
      });
  }
  
  



    
  
  
  

  return (
    
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
                <CreatePlaylist onPlaylistCreated={() => {}} />
                <p>Discover trending tracks, featured artists, and editor’s picks!</p>
                <SongList songs={songs} onAddToFavorites={handleAddToFavorites} onAddToPlaylist={handleAddToPlaylist} playlists={playlists}/>
                <Trending onAddToFavorites={handleAddToFavorites} playlists={playlists} onAddToPlaylist={handleAddToPlaylist}/>
                <PopularArtists onAddToFavorites={handleAddToFavorites} playlists={playlists} onAddToPlaylist={handleAddToPlaylist}/>
                <NewReleases onAddToFavorites={handleAddToFavorites} playlists={playlists} onAddToPlaylist={handleAddToPlaylist}/>
                <EditorsPicks onAddToFavorites={handleAddToFavorites} playlists={playlists} onAddToPlaylist={handleAddToPlaylist}/>
              </>
            
            }
          />

            <Route path="/artist/:id" element={<ArtistPage/>} />
            

           <Route path="/favorites" element={<Favorites onAddToFavorites={handleAddToFavorites} onAddToPlaylist={handleAddToPlaylist} playlists={playlists} />}  />
            <Route path="/playlists" element={<PlaylistPage />} />

 


      </Routes>

      

    </div>
  
  
);
}

export default MainApp;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         