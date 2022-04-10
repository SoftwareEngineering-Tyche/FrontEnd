import React, { useEffect, useState } from "react";
import "../assets/styles/profile-page.scss";
import Button from '@mui/material/Button';
import defaultProfilePicture from '../assets/images/default-profile-picture.png';
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import { connect } from "react-redux";
import { login } from "../store/authentication/action";

function ProfilePage () {
    const [ethAddress, setEthAddress] = useState(null);
    if(window.ethereum !== undefined)
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {setEthAddress(accounts[0]);})
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
                        {window.innerWidth > 768 && <div className="wallet">
                            <img src={ethereumIcon} width={18} height={18}/>
                            <span>آدرس اتریوم : </span>
                            <span> {ethAddress} </span>
                        </div>}
                    </div>
                </div>
                {window.innerWidth <= 768 && <div className="wallet">
                    <img src={ethereumIcon} width={18} height={18}/>
                    <span> {ethAddress} </span>
                </div>}
            </div>
        </div>
    );
}
export default connect(
    null,
    dispatch => ({
        login: userData => dispatch(login(userData)),
    }))(ProfilePage);