import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ To get the clicked user info
import "../styles/Profile.css"; 

const Profile = () => {
  const { username } = useParams(); 
  const [userProfile, setUserProfile] = useState(null);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);

  useEffect(() => {
    // Fetch specific user details
    fetch(`https://api.unsplash.com/users/${username}?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`)
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error(error));

    // Fetch suggested profiles
    fetch("https://api.unsplash.com/photos?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM")
      .then((response) => response.json())
      .then((data) => setSuggestedProfiles(data))
      .catch((error) => console.error(error));
  }, [username]);

  return (
    <div className="profile-container">
      {/* Profile Section */}
      {userProfile ? (
        <div className="user-profile">
          <img
            src={userProfile.profile_image.large}
            alt={userProfile.name}
            className="profile-photo-large"
          />
          <div className="profile-info">
            <h2>{userProfile.name}</h2>
            <p>
              <strong>{userProfile.total_photos}</strong> Posts | 
              <strong>{userProfile.followers_count || "N/A"}</strong> Followers | 
              <strong>{userProfile.following_count || "N/A"}</strong> Following
            </p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Suggested Profiles Section */}
      <h3>Suggested Profiles</h3>
      <div className="profile-list">
        {suggestedProfiles.map((photo) => (
          <a key={photo.id} href={`/profile/${photo.user.username}`} className="profile-card">
            <img src={photo.user.profile_image.large} alt={photo.user.name} className="profile-photo" />
            <p className="profile-name">{photo.user.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Profile;
