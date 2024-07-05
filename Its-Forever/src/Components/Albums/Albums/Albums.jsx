import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import MediaRender from "../MediaRender/MediaRender";
import {fetchAlbums} from "../../../Scripts/FetchAlbums";
import './Albums.css';

function Albums() {
    const [media, setMedia] = useState([]);
    const location = useLocation();
    const { folder } = location.state || {};
    const { albumId } = useParams();
    const [deleteId, setDeletId] = useState()

    useEffect(() => {
        fetchAlbums(albumId, setMedia);
    }, []);

    return (
        <div className="albums">
            <Header />
            <div className="cover-photo-container">
                    <img src={folder.coverPhotoUrl} alt="Cover" className="cover-photo" />
                    {folder.name && <div className="album-name">{folder.name}</div>}
                    <div className="cover-photo-gradient"></div>
            </div>
            <MediaRender media={media} flag="album" setDeletId={setDeletId}/>
        </div>
    );
}

export default Albums;
