import React, { useEffect, useLayoutEffect, useState } from "react";
import { CarouselVideoPlayer } from "../VedioPlayer/VideoPlayer";
import { CarouselImageDisplay } from "../Images/Image";
import {Icon} from '@iconify-icon/react'
import {CarouselIcons} from "../Icons/Icons";
import './Carousel.css';

const Carousel = ({ media, initialIndex, onClose, flag, setDeletId, setInitialCarouselIndex }) => {

    // const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const userType = sessionStorage.getItem('userType');
    const [currentMedia, setCurrentMedia] = useState(media[initialIndex])

    // useEffect(() => {
    //     setCurrentMedia(media[initialIndex])
    //     console.log(currentMedia, "useEffect")
    // },[initialIndex])

    const handleNext = () => {
        setInitialCarouselIndex((prevIndex) => (prevIndex + 1) % media.length);
    };

    const handlePrev = () => {
        setInitialCarouselIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
    };

    // const currentMedia = initialIndex;

    console.log(currentMedia, initialIndex, media, flag )

    return (
        <div className="carousel-overlay">
            <button className="close-button" onClick={onClose}><Icon icon="fa6-solid:arrow-left"/></button>
            { userType === "host" && <CarouselIcons mediaId={initialIndex} media={media} flag={flag} setInitialCarouselIndex={setInitialCarouselIndex} setDeletId={setDeletId} setCurrentMedia={setCurrentMedia}/> }
            <button className="prev-button" onClick={handlePrev}>‹</button>
                <div className="carousel-content">
                    <div className="media-display">
                        {currentMedia.type === 'image' ? (
                            <CarouselImageDisplay src={currentMedia.item.url} />
                        ) : (
                            <CarouselVideoPlayer src={currentMedia.item.url} />
                        )}
                    </div>
                </div>
            <button className="next-button" onClick={handleNext}>›</button>
        </div>
    );
};

export default Carousel;
