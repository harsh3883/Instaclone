import React from "react";
// import "../styles/Stories.css"; 
const Stories = ({ photos }) => {
  return (
    <div className="story-container">
      {photos.map((photo) => (
        <div key={photo.id} className="story-photo">
          <img src={photo.user.profile_image.large} alt={photo.user.name} />
          <p className="username">{photo.user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
