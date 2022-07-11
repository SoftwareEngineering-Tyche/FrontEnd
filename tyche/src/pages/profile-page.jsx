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
import NFTImage from '../assets/images/app-logo.png';
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
import "../assets/styles/cards.scss"; 

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
    const [subTabValue, setSubTabValue] = useState(0);
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
    const [statusOffers, setStatusOffers] = useState([]);
    const { id } = useParams();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleSubTabChange = (event, newValue) => {
        setSubTabValue(newValue);
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
            <Link className="item-card" underline="none" href={mode === 'product' ? `/product/${item.id}` : `/collection/${item.id}`}>
                {mode === 'product' ? <img src={hostUrl + item.image} className="square-img"/> : <img src={hostUrl + item.logoimage} className="round-img" />}
                <div className="item-name">{item.Name}</div>
                <div className="item-description">{item.Description}</div>
            </Link>
        );
    }
    const getOfferStatus = (id, index) => {
        let status = "";
        callAPI({ method: "GET", url: `${hostUrl}/WorkArtOffer/${id}` }).then(response => {
            response.payload.map(offer => {
                if (offer.From === ethAddress) {
                    statusOffers[index] = offer.status
                }
            });
        })
    }
    const getOfferCard = (item, index, mode) => (
        <div className="offer-card">
            <div className="info">
                <img src={hostUrl + item.image} />
                <div className="texts">
                    <div className="name-text">نام: {item.Name}</div>
                    <div className="price-text"><span>{mode === 'myOffers' ? "قیمت پیشنهادی: " : "قیمت: "}</span>
                        {item.Price}
                    </div>
                </div>
            </div>
            {getOfferStatus(item.id, index)}
            {mode === 'myOffers' && <span className="status"><span>وضعیت: </span>
                {statusOffers[index] === "Pending" ?
                    <span className="pending">درحال بررسی</span> : statusOffers[index] === "accepted" ?
                        <span className="accepted">قبول شده</span> :
                        <span className="rejected">رد شده</span>
                }
            </span>}
            {mode === 'offersForMe' &&
                <Link href={`/product/${item.id}`} className="action">
                    <Button variant="outlined">مشاهده لیست پیشنهادها</Button>
                </Link>
            }
        </div>
    )
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
                <div className="wallet" data-test="wallet">
                    <Button variant="outlined" data-test="btn-button" onClick={() => copyEthAddress(ethAddress)} classes={{ root: 'copy-btn' }}>
                        <img src={ethereumIcon} height={16} data-test="img-prof"/>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {ethAddress?.slice(0, 5)}...{ethAddress?.slice(-3)}
                        </span>
                    </Button>
                    <Snackbar open={pressCopy} autoHideDuration={3000} onClose={() => setPressCopy(false)} data-test="Snackbar">
                        <Alert onClose={() => setPressCopy(false)} data-test="alert" severity="success" sx={{ width: '100%' }}>آدرس اتریوم شما با موفقیت کپی شد</Alert>
                    </Snackbar>
                </div>
                {!id && <div className="additional-information"><div>موجودی کیف پول : {balance}</div></div>}
            </div>
            <div className="contents" data-test="contents">
                {!isEditMode ?
                    <div className="tabs-container">
                        <StyledTabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="کلکسیون‌ها" classes={{ root: 'tab' }}  data-test="collectiontab"/>
                            <Tab label="ساخته شده‌ها" classes={{ root: 'tab' }} data-test="craettab"/>
                            <Tab label="علاقه‌مندی‌ها" classes={{ root: 'tab' }} data-test="favoritetab"/>
                            <Tab label="پیشنهادها" classes={{ root: 'tab' }} data-test="requesttab"/>
                        </StyledTabs>
                        <Divider />
                        <div className='tabs-contents' data-test="tabs-contents">
                            <TabPanel value={tabValue} index={0} data-test="collectionpanel">
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
                            <TabPanel value={tabValue} index={1} data-test="creatpanel">
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
                            <TabPanel value={tabValue} index={2} data-test="favoritpanel">
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
                            <TabPanel value={tabValue} index={3} data-test="requestpanel">
                                <div style={{ width: '95vw' }}>
                                    <StyledTabs value={subTabValue} onChange={handleSubTabChange}>
                                        <Tab label="پیشنهادهای من" classes={{ root: 'tab' }}  data-test="myrequesttab"/>
                                        <Tab label="پیشنهادهای دیگران" classes={{ root: 'tab' }} data-test="otherrequesttab"/>
                                    </StyledTabs>
                                    <TabPanel value={subTabValue} index={0} data-test="myrequestpanel">
                                        {myOffers && myOffers.length > 0 &&
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {myOffers.map((product, index) => (
                                                    getOfferCard(product, index, 'myOffers')
                                                ))}
                                            </div>
                                        }
                                        {!myOffers || myOffers.length === 0 &&
                                            <div>شما هنوز پیشنهاد خرید برای محصولی ثبت نکردین</div>
                                        }
                                    </TabPanel>
                                    <TabPanel value={subTabValue} index={1} data-test="otherrequestpanel">
                                        {offersForMe && offersForMe.length > 0 &&
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {offersForMe.map((product, index) => (
                                                    getOfferCard(product, index, 'offersForMe')
                                                ))}
                                            </div>
                                        }
                                        {!offersForMe || offersForMe.length === 0 &&
                                            <div>کسی هنوز برای شما پیشنهاد خرید ثبت نکرده است</div>
                                        }
                                    </TabPanel>
                                </div>
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