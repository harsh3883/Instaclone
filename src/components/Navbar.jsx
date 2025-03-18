import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>INSTAGRAM</h2>
      <nav>
        <ul>
          <li><Link to="/">Feed</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
