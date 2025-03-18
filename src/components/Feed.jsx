import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Feed.css";
import {Search,Send,MessageCircle,Heart} from 'lucide-react';

const Feed = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://api.unsplash.com/photos?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="home-container">
      {/* Story container */}
      <div className="story-container">
        {photos.map((photo) => (
          <div key={photo.id} className="story-photo">
            <img src={photo.user.profile_image.large} alt={photo.user.name} />
            <p className="username">{photo.user.name}</p>
          </div>
        ))}
      </div>

      {/* Feed container */}
      <div className="feed">
        {photos.map((photo) => (
          <div key={photo.id} className="feed-card">
            {/* Card Header */}
            <div className="feed-card-header">
              <img
                src={photo.user.profile_image.small}
                alt={photo.user.name}
                className="feed-profile-photo"
              />
              <p className="username">{photo.user.name}</p>
            </div>

            {/* Main Post Image */}
            <div className="main-post">
              <Link to={`/post/${photo.id}`}>
                <img src={photo.urls.small} alt={photo.description} />
              </Link>
            </div>
            <div className="feed-icons">
                <Heart/>
                <MessageCircle/>
                <Send/>
            </div>
            <div className="caption-card">
            <p className="caption-username">{photo.user.name}</p>
            <p className="caption">{photo.alt_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
