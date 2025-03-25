import React, { useState } from "react";
import "../styles/Create.css";

const Create = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

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
  
      // Resize logic (reduce to 50% of original)
      canvas.width = img.width / 2;
      canvas.height = img.height / 2;
  
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.6)); // Compress to 60% quality
    };
  };
  

  const handlePost = () => {
    if (!image) {
      alert("Please upload an image before posting.");
      return;
    }
    const newPost = { image, caption };
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));
    setImage(null);
    setCaption("");
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
    </div>
  );
};

export default Create;
