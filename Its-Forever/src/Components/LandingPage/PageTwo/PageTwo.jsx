import React from 'react';
import './PageTwo.css';
import Header from '../../Header/Header';

function PageTwo({ itemName, coverPhotoURL, description, setCurrentPage }) {
    return (
        <div className="page-two-container">
            <Header setCurrentPage={setCurrentPage}/>
            <div className="divider"></div>
            <div className="page-two-content">
                <div className="image-container">
                    <img className="image-second" src={coverPhotoURL} alt={itemName} />
                </div>
                <div className="description-container">
                    <h2 className="description-heading">About</h2>  
                    <p>{description}</p>  
                </div>
            </div>
        </div>
    );
}

export default PageTwo;
