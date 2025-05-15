  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import "../styles/Create.css";

  const Create = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [photo, setPhotos] = useState([]);

    useEffect(() => {
      const storedphoto = JSON.parse(localStorage.getItem("photo")) || [];
      console.log("Stored photo:", storedphoto); // <--- Check this in console
      setPhotos(storedphoto);
    }, []);
    

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          compressImage(reader.result, (compressedImage) => {
            setImage(compressedImage);
          });
        };
        reader.readAsDataURL(file);
      }
    };

    const compressImage = (base64Str, callback) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width / 2;
        canvas.height = img.height / 2;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL("image/jpeg", 0.6));
      };
    };

    const generateUniqueId = () => `local-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

    const handlePost = () => {
      if (!image) {
        alert("Please upload an image before posting.");
        return;
      }

      const newPost = {
        id: generateUniqueId(),
        image,
        caption,
      };

      const updatedphoto = [newPost, ...photo];
      localStorage.setItem("photo", JSON.stringify(updatedphoto));
      setPhotos(updatedphoto);
      setImage(null);
      setCaption("");
      console.log("New Post Created:", newPost);
      alert("Post created successfully!");
    };

    return (
      <div className="create-container">
        <h2>Create a Post</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" className="image-preview" />}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <button onClick={handlePost}>Post</button>

        <h3>Your photo</h3>
        <div className="post-gallery">
        {photo.map((post) => {
          console.log("Rendering post with ID:", post.id); // <-- Add this
          return (
            <Link to={`/local-post/${post.id}`} key={post.id} className="post-card">
              <img src={post.image} alt="Post" className="posted-image" />
              <p className="post-caption">{post.caption}</p>
            </Link>
          );
        })}

        </div>
      </div>
    );
  };

  export default Create;
