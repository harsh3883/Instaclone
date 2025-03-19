import React, { useEffect, useState } from "react";
import "../styles/SearchImages.css";

const SearchImages = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        let allPhotos = [];
        let page = 1;

        while (allPhotos.length < 100) {
          const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&per_page=30&client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`
          );
          const data = await response.json();
          
          // Prevent duplicates by adding unique index-based keys
          data.forEach((photo, index) => {
            photo.unique_id = `${photo.id}-${index}`;
          });

          allPhotos = [...allPhotos, ...data];
          page++;
        }

        setPhotos(allPhotos.slice(0, 100));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="search-images">
      {photos.map((photo) => (
        <div key={photo.unique_id} className="search-card">
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            className="search-image"
          />
        </div>
      ))}
    </div>
  );
};

export default SearchImages;
