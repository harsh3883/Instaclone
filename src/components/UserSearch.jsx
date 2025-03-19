import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UserSearch.css";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setUsers([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/users?query=${query}&client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`
      );

      const data = await response.json();
      setUsers(data.results || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="user-search-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for profiles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Search Results (Appears Below Search Bar) */}
      {users.length > 0 && (
        <div className="search-results">
          {users.map((user) => (
            <Link key={user.id} to={`/profile/${user.username}`} className="search-result-item">
              <img
                src={user.profile_image.small}
                alt={user.username}
                className="search-profile-photo"
              />
              <p className="username">{user.username}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;

