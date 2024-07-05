import React, { useEffect, useState } from "react";
import {ImageDisplay} from "../Albums/Images/Image"
import {VideoPlayer} from "../Albums/VedioPlayer/VideoPlayer";

function RenderMediaRows ({media, handleMediaClick, carouselOpen, flag, setDeletId}) {
    
    const getCount = (media) => {
        return media.reduce((count, item) => {
            return item.type === 'video' ? count + 1 : count;
        }, 0);
    }
    
    const rows = [];
    let remainingVideos = getCount(media);
    let count = 3;

    const render = () => {

        for (let i = 0; i < media.length; i += count) {

            if (remainingVideos > 0) {
                count = 3;
                const rowItems = media.slice(i, i + count);

                if (rows.length % 2 === 0) {
                    // Odd row: 1 video, 2 images
                    const video = rowItems.find(item => item.type === 'video');
                    const images = rowItems.filter(item => item.type === 'image');
                    rows.push(
                        <div key={`row-${i}`} className="media-row">
                            <div className="media-half" >
                                <VideoPlayer mediaId={i} id={video.item.id} carouselOpen={carouselOpen} src={video.item.url} handleMediaClick={handleMediaClick} flag={flag} setDeletId={setDeletId}/>
                            </div>
                            <div className="media-half images-right">
                                {images.map((image, index) => (
                                    <ImageDisplay key={index} mediaId={i + index + 1} id={image.item.id} src={image.item.url} alt="" className="media-image-half" handleMediaClick={handleMediaClick} flag={flag} setDeletId={setDeletId}/>
                                ))}
                            </div>
                        </div>
                    );
                } else {
                    // Even row: 2 images, 1 video
                    const video = rowItems.find(item => item.type === 'video');
                    const images = rowItems.filter(item => item.type === 'image');
                    rows.push(
                        <div key={`row-${i}`} className="media-row">
                            <div className="media-half images-left">
                                {images.map((image, index) => (
                                    <ImageDisplay key={index} mediaId={i + index} id={image.item.id} src={image.item.url} alt="" className="media-image-half" handleMediaClick={handleMediaClick} flag={flag} setDeletId={setDeletId}/>
                                ))}
                            </div>
                            <div className="media-half" >
                                <VideoPlayer mediaId={i+2} id={video.item.id} carouselOpen={carouselOpen} src={video.item.url} flag={flag} setDeletId={setDeletId} handleMediaClick={handleMediaClick}/>
                            </div>
                        </div>
                    );
                }
                remainingVideos--;
            } else {
                count = 4;
                const rowItems = media.slice(i, i + count);
                rows.push(
                    <div key={`row-${i}`} className="media-row media-row-images">
                        {rowItems.map((item, index) => (
                            <div key={index} className="media-quarter">
                                <ImageDisplay mediaId={i + index} id={item.item.id} src={item.item.url} alt="" className="media-image-quarter" handleMediaClick={handleMediaClick} flag={flag} setDeletId={setDeletId}/>
                            </div>
                        ))}
                    </div>
                );
            }
        }

        return rows;
    }

    return(
        <div>
            {render()}
        </div>
    );
};

export default RenderMediaRows;