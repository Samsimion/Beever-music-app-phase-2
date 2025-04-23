// src/components/SearchBar.js
import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
      setTerm("");
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for music..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
