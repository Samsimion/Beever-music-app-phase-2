import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="beever-header">
      <h1>🐝 Beever Music</h1>
      <p>Stream music your way.</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/playlists">Playlists</Link>
      </nav>

    </header>
  );
}

export default Header;