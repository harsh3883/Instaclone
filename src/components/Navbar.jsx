import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>INSTAGRAM</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Search</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/messages">Messages</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/profile">Profile</Link></li>

        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
