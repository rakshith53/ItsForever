import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../Constant/logos.png'; 

function Header({setCurrentPage}) {
  const id = sessionStorage.getItem('eventID')

  const handleNavigation = (page) => {
    sessionStorage.setItem('currentPage', page);
    setCurrentPage(page)
    console.log(page)
  };

  return (
    <header className="header">
      <img src={logoImage} alt="Logo" />
      <nav>
        <Link onClick={() => handleNavigation(2)} to={`/${id}/landing`}>About</Link>
        <Link onClick={() => handleNavigation(3)} to={`/${id}/landing`}>Gallery</Link>
        {sessionStorage.getItem("userType") === "host" && <Link to={`/${id}/physical-albums`}>Physical Album</Link>}
      </nav>
    </header>
  );
}

export default Header;
