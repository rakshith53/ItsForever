import React from "react";
import { MediaRenderIcons } from "../Icons/Icons";
import './ImageDisplay.css';

export const ImageDisplay = ({ src, mediaId, id, alt, className, handleMediaClick, flag, setDeletId }) => {
    const userType = sessionStorage.getItem('userType')
    return (
        <div className="image-container" >
            { userType === "host" && <MediaRenderIcons id={id} mediaId={mediaId} flag={flag} setDeletId={setDeletId}/> }
            <img src={src} alt={alt} className={className} onClick={() => handleMediaClick(mediaId)}/>
        </div>   
    );
};

export const CarouselImageDisplay = ({ src }) => {
    return (
        <div className="image-container">
            <img src={src} alt="" className="carousel-image" />
        </div>
    );
}