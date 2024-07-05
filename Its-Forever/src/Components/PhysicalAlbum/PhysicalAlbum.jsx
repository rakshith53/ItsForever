import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import MediaRender from '../Albums/MediaRender/MediaRender';
import './PhysicalAlbum.css';
import { fetchPhysicalAlbums } from '../../Scripts/FetchAlbums';

const PhysicalAlbum = () => {
    const [media, setMedia] = useState([]);
    const [deleteId, setDeletId] = useState(null)

    const id = sessionStorage.getItem("eventID")

    useEffect(() => {
        fetchPhysicalAlbums(id, setMedia);
    }, []);

    useEffect(() => {
      let newMedia = media.filter((_, index) => index !== deleteId);
      setMedia(newMedia)
      setDeletId(null)
      console.log(newMedia)
    }, [deleteId]);

  return (
    <div className='physical-albums'>
      <Header />
      <div className="divider"></div>
      <h1 className='heading'>Physical Album</h1>
        {media.length > 0 ? (
            <MediaRender media={media} setDeletId={setDeletId} flag="physicalAlbum"/>
        ) : (
            <p>No albums available</p>
        )}
    </div>
  );
};

export default PhysicalAlbum;
