import React, { useEffect, useState } from "react";
import "../assets/styles/profile-page.scss";
import defaultProfilePicture from '../assets/images/default-profile-picture.png';
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import { connect } from "react-redux";
import { login } from "../store/authentication/action";
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import emptyCollectionsIcon from '../assets/images/empty-collections.svg';
import emptyFavoritesIcon from '../assets/images/empty-favorites.svg';
import emptyCreationsIcon from '../assets/images/empty-creations.svg';
import { Divider, TextField, Grid, Snackbar, Tab, Tabs, Button } from "@mui/material";
import Init from '../web3client';
import { styled } from '@mui/material/styles';
import { ethers } from "ethers";
import Web3 from 'web3';
import { hostUrl } from "../host-url";
import { callAPI } from "../components/api-call";
import profileBackground from "../assets/images/profile-background.jpg";
import { Card, CardActionArea, CardContent, CardMedia, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

const web3 = new Web3(window.ethereum);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const StyledTabs = withStyles({
    root: {
        "& div.MuiTabs-scroller": {
            "& .MuiTabs-flexContainer": {
                justifyContent: "center",
            }
        }
    }
})(Tabs);
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
    const [creations, setCreations] = useState([]);
    const [myOffers, setMyOffers] = useState();
    const [offersForMe, setOffersForMe] = useState();
    const [socials, setsocials] = useState();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [onSubmit, setOnSubmit] = useState(false);
    const [emailhelper, setemailhelper] = useState("");
    const [userhelper, setuserhelper] = useState("");
    const { id } = useParams();

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
    function getCard(item, mode) {
        return (
            <Card sx={{ borderRadius: '16px', overflow: 'unset', margin: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link underline="none" href={mode === 'product' ? `/product/${item.id}` : `/collection/${item.id}`}>
                    <CardActionArea sx={{ width: '220px', margin: '8px' }}>
                        <div style={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia sx={{ display: 'flex', justifyContent: 'center', padding: '4px', margin: '0px' }}>
                                {mode === 'product' ? <img src={hostUrl + item.image} width={150} height={150} /> : <img src={hostUrl + item.logoimage} width={150} height={150} style={{ borderRadius: '50%' }} />}
                            </CardMedia>
                        </div>
                        <CardContent sx={{ padding: '8px 16px', height: '30%' }}>
                            <div style={{ color: '#2F3A8F', display: 'flex', justifyContent: 'center' }}>{item.Name}</div>
                            <div style={{ color: '#CDBDFF', display: 'flex', justifyContent: 'center', fontSize: 'small', textAlign: 'center' }}>{item.Description}</div>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        );
    }
    useEffect(() => {
        if (window.ethereum !== undefined) {
            if (id) {
                setEthAddress(id);
                web3.eth.getBalance(id).then(res => setBalace(ethers.utils.formatEther(res)));
            }
            else {
                window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                    setEthAddress(accounts[0]);
                    web3.eth.getBalance(accounts[0]).then(res => setBalace(ethers.utils.formatEther(res)));
                })
            }
        }
    }, [id]);
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
        callAPI({ method: "GET", url: `${hostUrl}/Account/${ethAddress}` }).then(response => {
            if (response.payload.username !== 'null') setUsername(response.payload.username);
            if (response.payload.email !== 'null') setEmail(response.payload.email);
            if (response.payload.bio !== 'null') setBio(response.payload.bio);
            setFavorites(response.payload.favorite);
            setsocials(response.payload.socials);
            if (response.payload.banner && response.payload.banner !== '/media/null' && response.payload.banner !== '/media/undefined')
                setBanner(hostUrl + response.payload.banner);
            if (response.payload.avatar && response.payload.avatar !== '/media/null' && response.payload.avatar !== '/media/undefined')
                setProfilePic((hostUrl + response.payload.avatar));
            fetch(document.getElementById('banner').src).then(res => res.blob()).then(blob => {
                const file = new File([blob], 'banner.jpg', blob)
                setBannerFile(file);
            })
            fetch(document.getElementById('profile').src).then(res => res.blob()).then(blob => {
                const file = new File([blob], 'profile.png', blob)
                setProfilePicFile(file);
            })
        });
        callAPI({ method: "GET", url: `${hostUrl}/Accountcollection/${ethAddress}` }).then(response => {
            setCollections(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/AccountWorkarts/${ethAddress}` }).then(response => {
            setCreations(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/Accountfavorites/${ethAddress}` }).then(response => {
            setFavorites(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/workartofferAccount/${ethAddress}` }).then(response => {
            setMyOffers(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/workartoffermyAccount/${ethAddress}` }).then(response => {
            setOffersForMe(response.payload);
        });
    }, [ethAddress]);
    useEffect(() => {
        if (onSubmit) {
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

    return (
        <div className="profile-page">
            <div className="profile-info">
                {!banner ? <img src={profileBackground} className="background" /> : <img id="banner" src={banner} className="background" />}
                <div className="information">
                    <div className={profilePic ? "profile-picture" : "profile-picture no-pic"}>
                        {!profilePic ? <img src={defaultProfilePicture} width="120" height="120" /> : <img id="profile" src={profilePic} width="120" height="120" />}
                    </div>
                    {!id && <Button variant="outlined" color="inherit" size="small" classes={{ root: 'edit-btn' }} onClick={() => setIsEditMode(true)}>
                        <EditIcon />
                    </Button>}
                </div>
                <div className="name">
                    <span>{(username && username !== 'null') ? username : 'بدون نام کابری'}</span>
                </div>
                {bio && bio !== 'null' && <div className="additional-information bio">{bio}</div>}
                <div className="wallet">
                    <Button variant="outlined" onClick={() => copyEthAddress(ethAddress)} classes={{ root: 'copy-btn' }}>
                        <img src={ethereumIcon} height={16} />
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {ethAddress?.slice(0, 5)}...{ethAddress?.slice(-3)}
                        </span>
                    </Button>
                    <Snackbar open={pressCopy} autoHideDuration={3000} onClose={() => setPressCopy(false)}>
                        <Alert onClose={() => setPressCopy(false)} severity="success" sx={{ width: '100%' }}>آدرس اتریوم شما با موفقیت کپی شد</Alert>
                    </Snackbar>
                </div>
                {!id && <div className="additional-information"><div>موجودی کیف پول : {balance}</div></div>}
            </div>
            <div className="contents">
                {!isEditMode ?
                    <div className="tabs-container">
                        <StyledTabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="کلکسیون‌ها" classes={{ root: 'tab' }} />
                            <Tab label="ساخته شده‌ها" classes={{ root: 'tab' }} />
                            <Tab label="علاقه‌مندی‌ها" classes={{ root: 'tab' }} />
                            <Tab label="پیشنهادها" classes={{ root: 'tab' }} />
                        </StyledTabs>
                        <Divider />
                        <div className='tabs-contents'>
                            <TabPanel value={tabValue} index={0}>
                                <div style={{ width: '95vw' }}>
                                    {collections && collections.length > 0 &&
                                        <div className="d-flex flex-wrap justify-content-center">
                                            {collections.map((collection, index) => {
                                                return (getCard(collection, 'collection'));
                                            })}
                                        </div>
                                    }
                                    {!collections || collections.length === 0 &&
                                        <div>
                                            <img src={emptyCollectionsIcon} height={150} />
                                            <div>هنوز هیچ اثری را جمع‌آوری نکرده‌اید</div>
                                        </div>
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <div style={{ width: '95vw' }}>
                                    {creations && creations.length > 0 &&
                                        <div className="d-flex flex-wrap justify-content-center">
                                            {creations.map((product, index) => {
                                                return (getCard(product, 'product'));
                                            })}
                                        </div>
                                    }
                                    {!creations || creations.length === 0 &&
                                        <div>
                                            <img src={emptyCreationsIcon} height={150} />
                                            <div>هنوز هیچ اثری ساخته نشده</div>
                                        </div>
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                {id ?
                                    <div>این بخش از اطلاعات کاربر برای شما قابل مشاهده نیست</div>
                                    :
                                    <div style={{ width: '95vw' }}>
                                        {favorites && favorites.length > 0 &&
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {favorites.map((product, index) => {
                                                    return (getCard(product, 'product'));
                                                })}
                                            </div>
                                        }
                                        {!favorites || favorites.length === 0 &&
                                            <div>
                                                <img src={emptyFavoritesIcon} height={150} />
                                                <div>لیست علاقه‌مندی‌های شما خالی است</div>
                                            </div>
                                        }
                                    </div>
                                }
                            </TabPanel>
                            <TabPanel value={tabValue} index={3}>
                                {/* <div style={{ width: '95vw' }}> */}
                                {myOffers && myOffers.length > 0 &&
                                    <Grid container justifyContent="center">
                                        <Grid item xs={12} md={4} justifyContent="center">
                                            پیشنهاد های ثبت شده توسط شما
                                            <Divider className="m-2" />
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {myOffers.map((product, index) => (
                                                    getCard(product, 'product')
                                                ))}
                                            </div>
                                        </Grid>
                                        <Grid item xs={0} md={0.1} justifyContent="center">
                                            <div style={{ height: '100%', width: '1px', backgroundColor: 'red', border: '1px solid redx', display: 'flex', justifyContent: 'center' }} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            پیشنهاد های ثبت شده برای شما
                                            <Divider className="m-2" />
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {offersForMe && offersForMe.map((product, index) => (
                                                    getCard(product, 'product')
                                                ))}
                                            </div>
                                        </Grid>
                                    </Grid>
                                }
                                {!myOffers || myOffers.length === 0 &&
                                    <div>پیشنهاد ثبت شده‌ای موجود نیست</div>
                                }
                                {/* </div> */}
                            </TabPanel>
                        </div>
                    </div>
                    :
                    <div className="edit-profile-container">
                        <div className="get-input">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label htmlFor="profile-pic">
                                        <Input accept="image/*" id="profile-pic" multiple type="file" onChange={onProfilePicChange} />
                                        <Button variant="outlined" component="span" sx={{ marginRight: '8px' }}>
                                            عکس پروفایل
                                        </Button>
                                    </label>
                                    <label htmlFor="banner-pic">
                                        <Input accept="image/*" id="banner-pic" multiple type="file" onChange={onBannerChange} />
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
export default ProfilePage;