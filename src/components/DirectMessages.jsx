import React,{useState,useEffect} from "react";
import '../styles/DirectMessages.css'

const DirectMessages = () => {
    const[photos,setPhotos] = useState([]);

    useEffect(()=>{
        fetch("https://api.unsplash.com/photos?client_id=Fp9ozm0TnGKAmYinPrkTfzhSi8a5KnTKfCBS4DJR3YM")
        .then((response)=>response.json())
        .then((data)=>setPhotos(data))
        .catch((err)=>console.error(err));
    },[])

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