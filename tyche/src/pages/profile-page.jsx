import React from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/profile-page.scss";
import Button from '@mui/material/Button';
import defaultProfilePicture from '../assets/images/default-profile-picture.png';
import ethereumIcon from '../assets/icons/ethereum-icon.svg';

function ProfilePage () {
    return (
        <div className="profile-page">
            <div className="profile-info">
                <div className="background"/>
                <div className="information">
                    <div className="profile-picture">
                        <img src={defaultProfilePicture} width={120} height={120}/>
                    </div>
                    <div className="name-and-wallet">
                        <div className="name">نام و نام خانوادگی</div>
                        <div className="wallet">
                            <img src={ethereumIcon} width={18} height={18}/>
                            <span>آدرس اتریوم</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProfilePage;