import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ To get the clicked user info
import "../styles/Profile.css"; 
import useFetchPhotos from "../hooks/FetchPhotos";

const Profile = () => {
  const { username } = useParams(); 
  const [userProfile, setUserProfile] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch specific user details
  useEffect(() => {
    fetch(`https://api.unsplash.com/users/${username}?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`)
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error(error));
  }, [username]);

  // Fetch user's uploaded photos
  useEffect(() => {
    fetch(`https://api.unsplash.com/users/${username}/photos?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM`)
      .then((response) => response.json())
      .then((data) => setUserPhotos(data))
      .catch((error) => console.error(error));
  }, [username]);

  // Check Follow Status from localStorage
  useEffect(() => {
    const storedFollowStatus = localStorage.getItem(`follow_${username}`);
    setIsFollowing(storedFollowStatus === "true");
  }, [username]);

  // Follow/Unfollow Function
  const toggleFollow = () => {
    const newFollowStatus = !isFollowing;
    setIsFollowing(newFollowStatus);
    localStorage.setItem(`follow_${username}`, newFollowStatus);
  };

  // Fetch suggested profiles   
  const { photos, loading, error } = useFetchPhotos();

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <button 
              onClick={toggleFollow} 
              className={`follow-btn ${isFollowing ? "unfollow" : "follow"}`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      {/* Suggested Profiles Section */}
      <h3>Suggested Profiles</h3>
      <div className="profile-list">
        {photos.map((photo) => (
          <a key={photo.id} href={`/profile/${photo.user.username}`} className="profile-card">
            <img src={photo.user.profile_image.large} alt={photo.user.name} className="profile-photo" />
            <p className="profile-name">{photo.user.name}</p>
          </a>
        ))}
      </div>
      {/* User Photos Section */}
      {/* <h3>Photos by {userProfile?.name}</h3> */}
      <div className="user-photos-grid">
        {userPhotos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
            className="user-photo"
          />
        ))}
      </div>


    </div>
  );
};

export default Profile;
