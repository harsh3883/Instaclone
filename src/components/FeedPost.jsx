import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Feed.css";
import { Heart, MessageCircle, Send } from "lucide-react";

const FeedPost = ({ photos }) => {
  // Manage liked posts state
  const [likedPosts, setLikedPosts] = useState({});

  // Function to toggle like
  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId], 
    }));
  };

  return (
    <div className="home-container">
      {/* Feed Container */}
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

            {/* Like and Comment Icons */}
            <div className="feed-icons">
              <Heart
                fill={likedPosts[photo.id] ? "red" : "none"} 
                color={likedPosts[photo.id] ? "red" : "black"}
                onClick={() => toggleLike(photo.id)} 
                style={{ cursor: "pointer" }} 
              />
              {likedPosts[photo.id] ? photo.likes + 1 : photo.likes}
              <MessageCircle />
              <Send />
            </div>

            {/* Caption */}
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

export default FeedPost;
