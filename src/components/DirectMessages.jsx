import React,{useState,useEffect} from "react";
import '../styles/DirectMessages.css'
import useFetchPhotos from "../hooks/FetchPhotos";

const DirectMessages = () => {
    const { photos, loading, error } = useFetchPhotos();
  
    if (loading) return <p>Loading feed...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
        <div className="message-container">
            {photos.map((photo)=>(
                <div key={photo.id}
                    className="message-card">
                    <img src={photo.user.profile_image.large}
                    alt={photo.user.name}/>
                    <p className="message-username">{photo.user.name}</p>
                </div>  
            ))}
            </div>    
        </>
    )
}

export default DirectMessages