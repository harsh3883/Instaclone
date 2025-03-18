import React, { useEffect, useState } from "react";
import "../styles/Profile.css"; // ✅ Ensure the file exists

const Profile = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://api.unsplash.com/photos?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        } else {
          console.error("⚠️ API returned empty data:", data);
        }
      })
      .catch((error) => console.error("❌ API Fetch Error:", error));
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profiles</h2>
      <div className="profile-list">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="profile-card">
              <img
                src={photo.user.profile_image.large}
                alt={photo.user.name}
                className="profile-photo"
              />
              <p className="profile-name">{photo.user.name}</p>
            </div>
          ))
        ) : (
          <p>Loading profiles...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
