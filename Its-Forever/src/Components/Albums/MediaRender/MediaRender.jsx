import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import RenderMediaRows from "../../Utils/RenderMediaRows";
import './MediaRender.css';

function MediaRender ({ media, flag, setDeletId}) {
    const [carouselOpen, setCarouselOpen] = useState(false);
    const [initialCarouselIndex, setInitialCarouselIndex] = useState(0);

    const handleMediaClick = (index) => {
        setInitialCarouselIndex(index);
        setCarouselOpen(true);
    };

    useEffect(() => {

    },[initialCarouselIndex])

    return (
        <div className="album-content">
            <RenderMediaRows media={media} handleMediaClick={handleMediaClick} carouselOpen={carouselOpen} flag={flag} setDeletId={setDeletId}/>
            {carouselOpen && (
                <Carousel
                    media={media}
                    initialIndex={initialCarouselIndex}
                    setInitialCarouselIndex={setInitialCarouselIndex}
                    onClose={() => setCarouselOpen(false)}
                    setDeletId={setDeletId}
                    flag = {flag}
                />
            )}
        </div>
    );
};

export default MediaRender;
