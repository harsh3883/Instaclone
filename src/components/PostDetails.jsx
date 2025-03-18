import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/${id}?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`)
      .then((response) => response.json())
      .then((data) => setPhoto(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!photo) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <img src={photo.urls.full} alt={photo.description} />
      <h2>{photo.user.name}</h2>
      <p>{photo.description || "No description available"}</p>
    </div>
  );
};

export default PostDetails;
