import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import "../styles/UserSearch.css";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async (query) => {
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

  // Debounced version of fetchUsers
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchUsers(query);
    }, 500), // Adjust delay as needed
    []
  );

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="user-search-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for profiles..."
          value={searchQuery}
          onChange={handleChange}
        />
      </div>

      {/* Search Results */}
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
