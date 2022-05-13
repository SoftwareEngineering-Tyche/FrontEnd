<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React,{useState , useEffect} from 'react';
>>>>>>> 26b1243c0c4bde34b68539dc1bd552cb2eb6cc5b
import { Link } from 'react-router-dom';
import { Grid, Tab, Tabs, Container, Card } from '@mui/material';
import { hostUrl } from '../host-url';
import { callAPI } from "../components/api-call";
<<<<<<< HEAD
import axios from "axios";
=======

>>>>>>> 26b1243c0c4bde34b68539dc1bd552cb2eb6cc5b



const Explore = () => {

<<<<<<< HEAD
    const [tab, setTab] = useState('trending');
    const [Resault, setResault] = useState([]);
=======
    const [tab,setTab] = useState('trending');
    const [Resault, setResault] = useState([]);

    useEffect(() => {
        let formData = new FormData();
        formData.hotest = true;
        formData.favorites = true;
        formData.latest = true;
        console.log(formData)
        callAPI({method: 'GET',url: `${hostUrl}explore` ,data: formData }).then(response => {
            setResault(response.payload);
        });
    },[]);
>>>>>>> 26b1243c0c4bde34b68539dc1bd552cb2eb6cc5b

    useEffect(() => {

        // callAPI({method: 'GET',url: `${hostUrl}explore` , data:{hotest:'true' , favorites:'false' , latest:'false'} }).then(response => {
        //     setResault(response.payload);
        // });
        // axios({
        //     method: 'GET',
        //     url: 'https://api.ludushub.io/explore',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     data: {
        //         'hotest' : true,
        //         'favorites' : true,
        //         'latest' : true
        //     }
        //   })
        axios.get('https://api.ludushub.io/explore?latest=true&favorites=false&hotest=false');
    }, []);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }


    const goToUrl = u => {

    }

    return (
        <Container maxWidth="xl">
            <div className="explore-container">
                <h3 className="explore-title">مجموعه ات را پیدا کن</h3>
                <div className="tab-container">
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="پر طرفدار ها" value="trending" />
                        <Tab label="بهترین ها" value="top" />
                        <Tab label="هنر" value="arts" />
                        <Tab label="موسیقی" value="musics" />
                        <Tab label="عکاسی" value="photography" />
                        <Tab label="ورزشی" value="sport" />
                        <Tab label="کارت بازرگانی" value="tradingCards" />
                        <Tab label="دنیای مجازی" value="virtualWords" />
                    </Tabs>
                    {tab === 'trending' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'top' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'arts' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'musics' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'photography' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'sport' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'tradingCards' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    {tab === 'virtualWords' && (
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/product/1" className="nft-collection-parent">
                                    <Card onClick={goToUrl('test')}>
                                        <img src="/img/nft-sample.png" className="header-image" />
                                        <img src="/img/collection-profile.png" className="profile-image" />
                                        <h5>Collection Name Test</h5>
                                        <span>by <a href="#">Zahra MahmoudZadeh</a></span>
                                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print.</p>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default Explore;