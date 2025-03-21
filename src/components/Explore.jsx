import React, { useEffect, useState } from "react";
import "../styles/Explore.css";

const Explore = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch trending images on load
  useEffect(() => {
    fetchImages("trending");
  }, []);

  // Function to fetch images (trending or searched)
  const fetchImages = (searchTerm) => {
    setLoading(true);
    const url = searchTerm === "trending"
      ? `https://api.unsplash.com/photos?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM&per_page=30`
      : `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM&per_page=30`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(searchTerm === "trending" ? data : data.results);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  // Handle dynamic search
  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      fetchImages("trending");
    } else {
      fetchImages(e.target.value);
    }
  };

  return (
    <div className="explore-container">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Loading */}
      {loading && <p className="loading-text">Loading images...</p>}

      {/* Image Grid */}
      <div className="image-grid">
        {photos.map((photo, index) => (
          <div key={photo.id} className={`image-item ${index % 7 === 0 ? "large" : ""}`}>
            <img src={photo.urls.small} alt={photo.alt_description} className="explore-photo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
