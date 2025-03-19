import React from "react";
import UserSearch from "./UserSearch";
import SearchImages from "./SearchImages";
import "../styles/SearchPage.css";

const SearchPage = () => {
  return (
    <div className="search-container">
      {/* User Search Component */}
      <UserSearch />

      {/* Image Gallery Component */}
      <SearchImages />
    </div>
  );
};

export default SearchPage;
