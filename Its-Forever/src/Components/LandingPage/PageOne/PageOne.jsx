import React from 'react';
import './PageOne.css'; // Import the CSS for styling

const PageOne = ({ itemName, coverPhotoURL, date, photographer }) => {
    return (
        <div className="page-one-container">
            <img src={coverPhotoURL} alt={itemName} className="page-one-image" />
            <div className="page-one-overlay"></div> {/* Overlay for fading effect */}
            <div className="page-one-content">
                <h1 className="page-one-title">{itemName}</h1>
                <p className="page-one-date">{date}</p>
                <p className="page-one-photographer">Photography By : {photographer}</p>
            </div>
        </div>
    );
}

export default PageOne;
