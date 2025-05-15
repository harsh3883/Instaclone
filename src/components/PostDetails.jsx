import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!id) return;

    if (id.startsWith("local-")) {
      const storedPosts = JSON.parse(localStorage.getItem("photo")) || [];
      const found = storedPosts.find((p) => p.id === id);
      setPhoto(found);
    } else {
      fetch(`https://api.unsplash.com/photos/${id}?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`)
        .then((res) => res.json())
        .then((data) => setPhoto(data))
        .catch(console.error);
    }
  }, [id]);

  if (!photo) return <p>Loading...</p>;

  return (
    <div className="post-details">
      {/* Image container */}
      <div className="image-container">
        <button className="close-button" onClick={() => navigate(-1)}>
          &times;
        </button>
        {photo.urls ? (
          <img src={photo.urls.full} alt={photo.description} />
        ) : (
          <img src={photo.image} alt="Post" />
        )}
      </div>

      {/* Below image */}
      {photo.urls ? (
        <>
          <h2>{photo.user.name}</h2>
          <p>{photo.description || "No description available"}</p>
        </>
      ) : (
        <>
          <p>{photo.caption}</p>
        </>
      )}
    </div>
  );
};

export default PostDetails;
