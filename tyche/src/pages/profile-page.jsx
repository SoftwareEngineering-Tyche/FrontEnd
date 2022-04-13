import React, { useEffect, useState } from "react";
import "../assets/styles/profile-page.scss";
import Button from '@mui/material/Button';
import defaultProfilePicture from '../assets/images/default-profile-picture.png';
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import { connect } from "react-redux";
import { login } from "../store/authentication/action";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ToastContainer, toast } from 'react-toastify';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import emptyCollectionsIcon from '../assets/images/empty-collections.svg';
import emptyFavoritesIcon from '../assets/images/empty-favorites.svg';
import emptyCreationsIcon from '../assets/images/empty-creations.svg';
import { Divider } from "@mui/material";
import { ethers } from "ethers";
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && (<div>{children}</div>)}
        </div>
    );
}
function ProfilePage () {
    const [ethAddress, setEthAddress] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [pressCopy, setPressCopy] = useState(false);
    const [balance, setBalace] = useState(null);
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const copyEthAddress = (value) => {
        navigator.clipboard.writeText(value);
        setPressCopy(true);
    }
    if(window.ethereum !== undefined) {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            setEthAddress(accounts[0]);
            web3.eth.getBalance(accounts[0]).then(res => setBalace(ethers.utils.formatEther(res)));
        })
    }
    return (
        <div className="profile-page">
            <div className="profile-info">
                <div className="background"/>
                <div className="information">
                    <div className="profile-picture">
                        <img src={defaultProfilePicture} width={120} height={120}/>
                    </div>
                    <div className="name-and-wallet">
                        <div className="name">نام: نامشخص</div>
                        <div className="wallet">
                            <img src={ethereumIcon} width={18} height={18}/>
                            <span>{ethAddress?.slice(0,5)}...{ethAddress?.slice(-3)}</span>
                            <Button variant="outlined" classes={{root: 'copy-btn'}} onClick={() => copyEthAddress(ethAddress)}>
                                کپی آدرس
                            </Button>
                            <Snackbar open={pressCopy} autoHideDuration={3000} onClose={() => setPressCopy(false)}>
                                <Alert onClose={() => setPressCopy(false)} severity="success" sx={{ width: '100%' }}>آدرس اتریوم شما با موفقیت کپی شد</Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="additional-information">
                <div>موجودی کیف پول : {balance}</div>
            </div>
            <div className="tabs-container">
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="جمع آوری شده‌ها" />
                    <Tab label="ساخته شده‌ها" />
                    <Tab label="علاقه‌مندی‌ها" />
                </Tabs>
                <Divider/>
                <div className='tabs-contents'>
                    <TabPanel value={tabValue} index={0}>
                        <img src={emptyCollectionsIcon} height={150}/>
                        <div>هنوز هیچ اثری را جمع‌آوری نکرده‌اید</div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <img src={emptyCreationsIcon} height={150}/>
                        <div>هنوز هیچ اثری نساخته‌اید</div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <img src={emptyFavoritesIcon} height={150}/>
                        <div>لیست علاقه‌مندی‌های شما خالی است</div>
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
export default connect(
    null,
    dispatch => ({
        login: userData => dispatch(login(userData)),
    }))(ProfilePage);