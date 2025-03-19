import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Compass, MessageCircle, Bell, PlusSquare, User } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="navbar">
      <h2 className="logo">Instagram</h2>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/"><Home size={22} /> Home</Link>
          </li>
          <li className={location.pathname === "/search" ? "active" : ""}>
            <Link to="/search"><Search size={22} /> Search</Link>
          </li>
          <li className={location.pathname === "/explore" ? "active" : ""}>
            <Link to="/explore"><Compass size={22} /> Explore</Link>
          </li>
          <li className={location.pathname === "/messages" ? "active" : ""}>
            <Link to="/messages"><MessageCircle size={22} /> Messages</Link>
          </li>
          <li className={location.pathname === "/notifications" ? "active" : ""}>
            <Link to="/notifications"><Bell size={22} /> Notifications</Link>
          </li>
          <li className={location.pathname === "/create" ? "active" : ""}>
            <Link to="/create"><PlusSquare size={22} /> Create</Link>
          </li>
          <li className={location.pathname.startsWith("/profile") ? "active" : ""}>
            <Link to="/profile"><User size={22} /> Profile</Link>
          </li>
        </ul>
      </nav>
      
      {/* Profile Picture at Bottom */}
      <div className="navbar-profile">
        {/* <img src="https://via.placeholder.com/40" alt="User" className="profile-pic" /> */}
        <p></p>
      </div>
    </div>
  );
};

export default Navbar;
