import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import FeedPost from "./FeedPost";
import "../styles/Feed.css";
import useFetchPhotos from "../hooks/FetchPhotos";

const Feed = () => {
    const { photos, loading, error } = useFetchPhotos();
  
    if (loading) return <p>Loading feed...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-container">
      <Stories photos={photos} />
      <FeedPost photos={photos} />
    </div>
  );
};

export default Feed;
