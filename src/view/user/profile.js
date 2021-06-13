import React from "react";
import './user.css';
import docImg from '../../doc1.png';
import patientImg from '../../patient.jpg';
import {Link} from 'react-router-dom';

const Profile = () => {
    
    return (
        <div className="container">
            <div className="row pro">
                <div className="col">
                    <Link to="/login/doctor">
                        <img alt="Doctor" src={docImg}></img>
                        <br></br>
                        Doctors Login
                    </Link>
                </div>
                <div className="col">
                    <Link to="/login/patient">
                        <img alt="Patient" src={patientImg}></img>
                        <br></br>
                        Patients Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;