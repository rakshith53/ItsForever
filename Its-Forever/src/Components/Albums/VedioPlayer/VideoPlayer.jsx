import React, { useState, useRef } from "react";
import { MediaRenderIcons } from "../Icons/Icons";
import './VideoPlayer.css';

export const VideoPlayer = ({ mediaId, id, src, carouselOpen, handleMediaClick, flag, setDeletId}) => {
    const userType = sessionStorage.getItem('userType');
    return (
        <div className="video-container">
            { userType === "host" && <MediaRenderIcons mediaId={mediaId} id={id} flag={flag} setDeletId={setDeletId}/> }
            <video id={src} src={src} className="media-video" />
            <i className={`bi ${carouselOpen ? 'bi-pause-fill' : 'bi-play-fill'} play-pause-icon`} onClick={() => handleMediaClick(mediaId)}/>
        </div>
    );
};

export const CarouselVideoPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="video-container-carousel">
            <video ref={videoRef} src={src} className="carousel-video" />
            <button className="play-pause-button" onClick={handlePlayPause}>
                <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
            </button>
        </div>
    );
};
 
