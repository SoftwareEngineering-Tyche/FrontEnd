import React, { useEffect, useState } from "react";
import "../assets/styles/profile-page.scss";
import Button from '@mui/material/Button';
import defaultProfilePicture from '../assets/images/default-profile-picture.png';
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import { connect } from "react-redux";
import { login } from "../store/authentication/action";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import emptyCollectionsIcon from '../assets/images/empty-collections.svg';
import emptyFavoritesIcon from '../assets/images/empty-favorites.svg';
import emptyCreationsIcon from '../assets/images/empty-creations.svg';
import { Divider } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Init from '../web3client';
import { styled } from '@mui/material/styles';
import { ethers } from "ethers";
import Web3 from 'web3';
import { hostUrl } from "../host-url";
import axios from "axios";
import { callAPI } from "../components/api-call";
import profileBackground from "../assets/images/profile-background.jpg";

const web3 = new Web3(window.ethereum);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Input = styled('input')({
    display: 'none',
});
const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const userNameRegex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && (<div>{children}</div>)}
        </div>
    );
}
function ProfilePage(props) {

    const [ethAddress, setEthAddress] = useState(null);
    const [tabValue, setTabValue] = useState(props.value);
    const [pressCopy, setPressCopy] = useState(false);
    const [balance, setBalace] = useState("0.00");
    const [isEditMode, setIsEditMode] = useState(false);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState();
    const [banner, setBanner] = useState(null);
    const [bannerFile, setBannerFile] = useState();
    const [collections, setCollections] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [socials, setsocials] = useState();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [onSubmit, setOnSubmit] = useState(false);
    const [emailhelper, setemailhelper] = useState("");
    const [userhelper, setuserhelper] = useState("");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const copyEthAddress = (value) => {
        navigator.clipboard.writeText(value);
        setPressCopy(true);
    }
    const checkEmail = (email) => {
        const res = emailRegex.test(email)
        setIsEmailValid(res);
    }
    const checkUsername = (username) => {
        const res = userNameRegex.test(username);
        setIsUsernameValid(res);
    }
    const onProfilePicChange = (e) => {
        const [file] = e.target.files;
        setProfilePic(URL.createObjectURL(file));
        setProfilePicFile(e.target.files[0]);
    }
    const onBannerChange = (e) => {
        const [file] = e.target.files;
        setBanner(URL.createObjectURL(file));
        setBannerFile(e.target.files[0]);
    }
    const handleSubmit = () => {
        setOnSubmit(true);
        setIsEditMode(false);
    }
    const handleCancel = () => {
        setIsEditMode(false);
    }
    useEffect(() => {
        if (isUsernameValid)
          setuserhelper("");
        else
          setuserhelper("فرمت نام کاربری نامعتبر است");
    }, [isUsernameValid]);
    useEffect(() => {
        if (isEmailValid)
          setemailhelper("");
        else
          setemailhelper("فرمت ایمیل نامعتبر است");
    }, [isEmailValid]);
    useEffect(() => {
        if(onSubmit) {
            fetch(document.getElementById('banner').src).then(res => res.blob()).then(blob => {
                const file = new File([blob], 'banner.jpg', blob)
                setBannerFile(file);
            })
            fetch(document.getElementById('profile').src).then(res => res.blob()).then(blob => {
                const file = new File([blob], 'profile.png', blob)
                setProfilePicFile(file);
            })
            const data = new FormData();
            data.append("WalletInfo", ethAddress);
            data.append("username", username);
            data.append("bio", bio);
            data.append("email", email);
            data.append("avatar", profilePicFile);
            data.append("banner", bannerFile)
            callAPI({ method: "PUT", url: `${hostUrl}/Account/`, data: data });
            setOnSubmit(false);
        }
    }, [onSubmit]);
    useEffect(() => {
        fetch(`${hostUrl}/Account/${ethAddress}`).then(response => response.json())
            .then(data => {
                if(data.username!=='null') setUsername(data.username);
                if(data.email!=='null') setEmail(data.email);
                if(data.bio!=='null') setBio(data.bio);
                setCollections(data.collection);
                setFavorites(data.favorite);
                setsocials(data.socials);
                if(data.banner && data.banner!=='/media/null' && data.banner!=='/media/undefined')
                    setBanner(hostUrl + data.banner);
                if(data.avatar && data.avatar!=='/media/null' && data.avatar!=='/media/undefined')
                    setProfilePic((hostUrl + data.avatar));
                fetch(document.getElementById('banner').src).then(res => res.blob()).then(blob => {
                    const file = new File([blob], 'banner.jpg', blob)
                    setBannerFile(file);
                })
                fetch(document.getElementById('profile').src).then(res => res.blob()).then(blob => {
                    const file = new File([blob], 'profile.png', blob)
                    setProfilePicFile(file);
                })
            }
        )
    }, [ethAddress]);

    if(window.ethereum !== undefined) {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            setEthAddress(accounts[0]);
            web3.eth.getBalance(accounts[0]).then(res => setBalace(ethers.utils.formatEther(res)));
        })
    }
    
    return (
        <div className="profile-page">
            <div className="profile-info">
                {!banner ? <img src={profileBackground} className="background"/> : <img id="banner" src={banner} className="background"/>}
                <div className="information">
                    <div className={profilePic ? "profile-picture" : "profile-picture no-pic"}>
                        {!profilePic ? <img src={defaultProfilePicture} width="120" height="120"/> : <img id="profile" src={profilePic} width="120" height="120" />}
                    </div>
                    <div className="name-and-wallet">
                        <div className="name">
                            <span>{(username && username!=='null') ? username : 'بدون نام کابری'}</span>
                            <Button color="inherit" size="small" classes={{root: 'edit-btn'}} onClick={() => setIsEditMode(true)}>
                                <EditIcon/>
                                <span className="edit-text">ویرایش پروفایل</span>
                            </Button>
                        </div>
                        <div className="wallet">
                            <img src={ethereumIcon} width={18} height={18}/>
                            <span>{ethAddress?.slice(0,5)}...{ethAddress?.slice(-3)}</span>
                            <Button variant="outlined" size="small" classes={{root: 'copy-btn'}} onClick={() => copyEthAddress(ethAddress)}>
                                <span>کپی آدرس</span>
                            </Button>
                            <Snackbar open={pressCopy} autoHideDuration={3000} onClose={() => setPressCopy(false)}>
                                <Alert onClose={() => setPressCopy(false)} severity="success" sx={{ width: '100%' }}>آدرس اتریوم شما با موفقیت کپی شد</Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
            {bio && bio!=='null' && <div className="additional-information bio">{bio}</div>}
            {!isEditMode && <div className="additional-information"><div>موجودی کیف پول : {balance}</div></div>}
            <div className="contents">
                {!isEditMode ? 
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
                    :
                    <div className="edit-profile-container">
                        <div className="get-input">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label htmlFor="profile-pic">
                                        <Input accept="image/*" id="profile-pic" multiple type="file" onChange={onProfilePicChange}/>
                                        <Button variant="outlined" component="span" sx={{marginRight:'8px'}}>
                                            عکس پروفایل
                                        </Button>
                                    </label>
                                    <label htmlFor="banner-pic">
                                        <Input accept="image/*" id="banner-pic" multiple type="file" onChange={onBannerChange}/>
                                        <Button variant="outlined" component="span">
                                            عکس پس‌زمینه 
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        error={!isUsernameValid}
                                        fullWidth
                                        label="نام کاربری"
                                        value={username}
                                        onChange={event => { setUsername(event.target.value); checkUsername(event.target.value); }}
                                        helperText={userhelper}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        error={!isEmailValid}
                                        fullWidth
                                        label="آدرس ایمیل"
                                        value={email}
                                        onChange={event => { setEmail(event.target.value); checkEmail(event.target.value); }}
                                        helperText={emailhelper}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="بیو"
                                        value={bio}
                                        onChange={event => { setBio(event.target.value); }}
                                        multiline
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <Button variant="contained" classes={{ root: 'action submit' }} onClick={handleSubmit}>اعمال تغییرات</Button>
                        <Button variant="outlined" classes={{ root: 'action cancel' }} onClick={handleCancel}>انصراف</Button>
                    </div>
                }
            </div>
        </div>
    );
}
export default connect(
    null,
    dispatch => ({
        login: userData => dispatch(login(userData)),
    }))(ProfilePage);