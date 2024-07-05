import React, { useState } from 'react';
import './HostGuestPage.css';
import { USERNAME,  PASSWORD, pinCodeVerify } from '../../Constant/constants';
import leftImage from '../../Constant/LoginPageImage.jpg';
import logo2 from '../../Constant/logo2.png';
import { useNavigate } from 'react-router-dom';

function OTPPage() {
    const [pinCode, setPinCode] = useState('');
    const [isDirty, setIsDirty] = useState(false); 
    const id = sessionStorage.getItem('eventID')

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const newValue  = e.target.value;
        setPinCode(newValue)
        setIsDirty(newValue.length > 0)
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try{
            const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
            const response = await fetch(pinCodeVerify, {
                method: 'POST',
                headers: {
                    'Authorization': basicAuth,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pinCode, id})

            })
            const responseData = await response.json()
            if(responseData.status === "OK"){
                navigate(`/${id}/landing`)
            }

        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className="login-container">
            <div className="login-image" style={{ backgroundImage: `url(${leftImage})` }} />
            <div className="login-form-container">
                <img src={logo2} alt="Logo" className="login-logo" />
                <form>
                    <h2>Welcome</h2>
                    <p>Enter the pin code to join the event</p>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className={`form-input ${isDirty ? 'active' : 'inactive'}`}
                            value={pinCode}
                            onChange={handleInputChange}
                            placeholder="Eg: 4444"
                        />
                    </div>
                    <div className="vertical-btn-group">
                        <button 
                            type="button" 
                            className={`btn ${isDirty ? 'btn-confirm active' : 'btn-confirm inactive'}`}
                            onClick={handleClick}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OTPPage;
