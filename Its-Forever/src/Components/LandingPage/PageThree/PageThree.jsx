import React from 'react';
import './PageThree.css';
import Header from '../../Header/Header';
import { useNavigate } from 'react-router-dom';

function PageThree({ eventId, folderData, setCurrentPage }) {
    const navigate = useNavigate();
    const userType = sessionStorage.getItem('userType')

    const handleClick = (folder) => {
        if(userType === "guest"){
            if (folder.openToPublic) {
                navigate(`/${eventId}/albums/${encodeURIComponent(folder.id)}`, {
                state: {folder}
                });
            } else {
                alert("You don't have permission to view this folder.");
            }
        }
        else{
            navigate(`/${eventId}/albums/${encodeURIComponent(folder.id)}`, {
                state: {folder}
            });
        }
    };

    return (
        <div className="page-three-container">
            <Header setCurrentPage={setCurrentPage}/>
            <div className="divider"></div>
            <h1 className="gallery-heading">Our Gallery</h1>
            <div className="container mt-5">
                {folderData.reduce((rows, folder, index) => {
                    if (index % 2 === 0) {
                        const nextFolder = folderData[index + 1];
                        const isOddRow = Math.floor(index / 2) % 2 === 0;
                        const colClass1 = isOddRow ? "col-lg-8" : "col-lg-4";
                        const colClass2 = isOddRow ? "col-lg-4" : "col-lg-8";

                        rows.push(
                            <div key={index} className="row mb-4">
                                <div className={colClass1} onClick={() => handleClick(folder)}>
                                    <div className="card custom-card" style={{ backgroundImage: `url(${folder.coverPhotoUrl})` }}>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {userType === "guest" && !folder.openToPublic && <i className="bi bi-lock-fill lock-icon"></i>}
                                                {folder.name}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                {nextFolder && (
                                    <div className={colClass2} onClick={() => handleClick(nextFolder)}>
                                        <div className="card custom-card" style={{ backgroundImage: `url(${nextFolder.coverPhotoUrl})` }}>
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {userType === "guest" && !nextFolder.openToPublic && <i className="bi bi-lock-fill lock-icon"></i>}
                                                    {nextFolder.name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return rows;
                }, [])}
            </div>
        </div>
    );
}

export default PageThree;
