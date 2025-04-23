import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ArtistPage.module.css"; // Import the CSS module

function ArtistPage() {
  const { id } = useParams();
  const [artistDetails, setArtistDetails] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://itunes.apple.com/lookup?id=${id}&entity=musicArtist`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch artist details`);
        return res.json();
      })
      .then((data) => {
        if (data.results.length === 0) throw new Error("No artist found.");
        const artist = data.results[0];
        setArtistDetails(artist);

        // Fetch albums
        fetch(`https://itunes.apple.com/lookup?id=${id}&entity=album`)
          .then((res) => res.json())
          .then((albumData) => {
            setAlbums(albumData.results);
          });

        // Fetch top tracks using artist name
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist.artistName)}&media=music&limit=10`)
          .then((res) => res.json())
          .then((trackData) => {
            setTracks(trackData.results);
            setLoading(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.artistPage}>
      <h1>{artistDetails.artistName}</h1>
      <img className={styles.artistImage} src={artistDetails.artworkUrl100} alt={artistDetails.artistName} />
      <p>Genre: {artistDetails.primaryGenreName}</p>
      <p>Country: {artistDetails.country}</p>

      <h3>Top Albums:</h3>
      <div className={styles.albums}>
        {albums.length <= 1 ? (
          <p>No albums available.</p>
        ) : (
          albums
            .filter((item) => item.collectionType === "Album")
            .map((album) => (
              <div key={album.collectionId} className={styles.albumCard}>
                <img src={album.artworkUrl100} alt={album.collectionName} />
                <p>{album.collectionName}</p>
                <p>{album.releaseDate}</p>
              </div>
            ))
        )}
      </div>

      <h3>Top Tracks:</h3>
      <div className={styles.tracks}>
        {tracks.length === 0 ? (
          <p>No tracks available.</p>
        ) : (
          tracks.map((track) => (
            <div key={track.trackId} className={styles.trackCard}>
              <p>{track.trackName}</p>
              <audio controls src={track.previewUrl}></audio>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ArtistPage;
