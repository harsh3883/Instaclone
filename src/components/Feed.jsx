import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import FeedPost from "./FeedPost";
import "../styles/Feed.css";

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
      <Stories photos={photos} />
      <FeedPost photos={photos} />
    </div>
  );
};

export default Feed;
