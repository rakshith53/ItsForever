import React, { useEffect, useState, useContext  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './HostGuestPage.css';
import leftImage from '../../Constant/LoginPageImage.jpg';
import logo2 from '../../Constant/logo2.png';
import { AuthContext } from '../../Authentication/AuthContext';

function HostGuestPage() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('guest');

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            sessionStorage.setItem('eventID', id);
        }
    }, [id]);

    const handleUserTypeChange = (value) => {
        setUserType(value)
        sessionStorage.setItem("userType", value)
    
        if (value === 'guest') {
            navigate(`/${id}/landing`);
        } else {
            navigate(`/${id}/otp`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-image" style={{ backgroundImage: `url(${leftImage})` }} />
            <div className="login-form-container">
                <img src={logo2} alt="Logo" className="login-logo" />
                <form>
                    <h2>Who are you?</h2>
                    <p>Select your category for this event</p>
                    <div className="vertical-btn-group">
                        <button
                            type="button"
                            className={`btn ${userType === 'host' ? 'btn-host active' : 'btn-host inactive'}`}
                            onClick={() => handleUserTypeChange('host')}
                        >
                            I am Host
                        </button>
                        <button
                            type="button"
                            className={`btn ${userType === 'guest' ? 'btn-guest active' : 'btn-guest inactive'}`}
                            onClick={() => handleUserTypeChange('guest')}
                        >
                            I am Guest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HostGuestPage;

