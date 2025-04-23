import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="beever-header">
      <h1>🐝 Beever Music</h1>
      <p>Stream music your way.</p>
      <Link to="/favorites">Favorites</Link>

    </header>
  );
}

export default Header;