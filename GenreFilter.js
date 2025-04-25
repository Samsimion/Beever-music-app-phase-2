
import React from "react";
import styles from "./GenreFilter.module.css";


const genreMap = {

    Rap: "hip hop music",
    RnB: "rnb",
    Pop: "top pop hits",
    Rock: "classic rock",
    Afrobeat: "afrobeats",
    Jazz: "smooth jazz",
    Country: "country"
  
  
};

function GenreFilter({ onGenreSelect }) {
  return (
    <div className={styles.genreFilter}>
      <h3>Browse by Genre</h3>
      <div className={styles.genreButtons}>
        {Object.keys(genreMap).map((genre) => (
          <button key={genre} onClick={() => onGenreSelect(genreMap[genre])}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
