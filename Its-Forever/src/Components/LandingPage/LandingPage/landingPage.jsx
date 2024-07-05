import React, { useEffect, useState } from 'react';
import './LandingPage.css';

import PageOne from '../PageOne/PageOne'; 
import PageTwo from '../PageTwo/PageTwo';
import PageThree from '../PageThree/PageThree';

import fetchData from '../../../Scripts/FetchData';
import fetchFolderData from '../../../Scripts/FetchFolderData';

function LandingPage() {
    const [itemName, setItemName] = useState(null);
    const [coverPhotoURL, setCoverPhotoURL] = useState(null);
    const [date, setDate] = useState(null);
    const [photographer, setPhotographer] = useState(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [description, setDescription] = useState('');
    const [folderData, setFolderData] = useState([]);
    const [scrollUpCount, setscrollUpCount] = useState(0);

    const id = sessionStorage.getItem('eventID')
    const savedPage = sessionStorage.getItem('currentPage');
    const [currentPage, setCurrentPage] = useState(savedPage ? Number(savedPage) : 1);

    function getPhotographer(items) {
        const photographer = items.find(item => item.category === "Photography Company");
        return photographer ? photographer.name : "Unknown";
    }

    useEffect(() => {
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
        console.log(id)
    }, []);

    useEffect(() => {
        console.log(currentPage)
        sessionStorage.setItem('currentPage', currentPage);
    }, [currentPage]);


    useEffect(() => {
        const handleWheel = (event) => {
            if (isScrolling) return;
            setIsScrolling(true);

            setTimeout(() => {
                if (currentPage === 3) {
                    if(window.pageYOffset === 0 && scrollUpCount === 1 && event.deltaY < 0){
                        setCurrentPage(current => current - 1);
                    }
                    else if (window.pageYOffset === 0 && event.deltaY < 0) {
                        setscrollUpCount(1);
                    }
                    else if(window.pageYOffset !== 0){
                        setscrollUpCount(0);
                    } 
                } else if (event.deltaY < 0 && currentPage > 1) {
                    setCurrentPage(current => current - 1);
                } else if (event.deltaY > 0 && currentPage < 3) {
                    setCurrentPage(current => current + 1);
                }
                setIsScrolling(false);
            }, 500);
        };

        window.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentPage, isScrolling, scrollUpCount]);
    
    useEffect(() => {
        fetchData(id, setItemName, setCoverPhotoURL, setDate, setPhotographer, setDescription, getPhotographer );
        fetchFolderData(id, setFolderData);
    }, []);  

    return (
      <div>
        {currentPage === 1 && <PageOne itemName={itemName} coverPhotoURL={coverPhotoURL} date={date} photographer={photographer}/>}
        {currentPage === 2 && <PageTwo itemName={itemName} coverPhotoURL={coverPhotoURL} description={description} setCurrentPage={setCurrentPage}/>}
        {currentPage === 3 && <PageThree eventId={id} folderData={folderData} setCurrentPage={setCurrentPage}/>}
        {currentPage < 3 &&
          <div style={{ position: 'fixed', left: '50%', bottom: '5px', transform: 'translateX(-50%)' }}>
            <button onClick={() => setCurrentPage(current => current + 1)}>
              <i className="bi bi-arrow-down-circle-fill" style={{ fontSize: '1rem' }}></i>
            </button>
          </div>
        }
      </div>
    );
}

export default LandingPage;
