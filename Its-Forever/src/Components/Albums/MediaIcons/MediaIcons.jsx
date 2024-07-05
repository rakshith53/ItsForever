import React from 'react';
import { Icon } from '@iconify-icon/react';
import handleAddPhysicalAlbumClick from '../../../Scripts/AddToAlbum';
import handleDeletePhysicalAlbumClick from '../../../Scripts/DeleteFromPhysicalAlbum';
import './Icons.css';


const handleCarouselAddPhysicalAlbumClick = (mediaId, media) => {
    const item = media[mediaId];
    handleAddPhysicalAlbumClick(item.item.id);
};

const handleDeleteClick = (mediaId, id, setDeletId, setInitialCarouselIndex, media) => {
    // if(flag === true){
        if (mediaId === media.length - 1) {
            setInitialCarouselIndex(mediaId - 1);
            console.log(mediaId, id)
            handleDeletePhysicalAlbumClick(id);
            setDeletId(mediaId);
        } 
    //}
    console.log(mediaId, id)
    handleDeletePhysicalAlbumClick(id);
    setDeletId(mediaId);
};


export const CarouselIcons = ({ mediaId, media, flag, setDeletId, setInitialCarouselIndex }) => {
    console.log(mediaId, media);
    return (
        <div className="media-icons">
            {flag === "album" ? (
                <Icon
                    onClick={() => handleCarouselAddPhysicalAlbumClick(mediaId, media)}
                    icon="solar:album-bold-duotone"
                    className="icon-album"
                />
            ) : (
                <Icon
                    onClick={() => handleDeleteClick(mediaId, media[mediaId].item.id, setDeletId, true, setInitialCarouselIndex, media,)}
                    icon="akar-icons:trash-can"
                    className="icon-album"
                />
            )}
            <a href={media[mediaId].item.url} download>
                <Icon icon="prime:download" className="icon-album" />
            </a>
        </div>
    );
};