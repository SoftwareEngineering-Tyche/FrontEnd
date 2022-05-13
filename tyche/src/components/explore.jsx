import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Tab, Tabs, Container, Card } from '@mui/material';
import { hostUrl } from '../host-url';
import { callAPI } from "../components/api-call";

const Explore = () => {

    const [tab, setTab] = useState('all');
    const [Resault, setResault] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append("hotest", "true");
        data.append("favorites", "true");
        data.append("latest", "true");
        callAPI({ method: 'POST', url: `${hostUrl}/explore`, data: data }).then(response => {
            setResault(response.payload);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Container maxWidth="xl">
            <div className="explore-container">
                <h3 className="explore-title">مجموعه ات را پیدا کن</h3>
                <div className="tab-container">
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="همه" value="all" />
                        <Tab label="پر طرفدار ها" value="favorites" />
                        <Tab label="جذاب‌ترین‌ها" value="hotest" />
                        <Tab label="آخرین‌ها" value="latest" />
                    </Tabs>
                    {Resault.data && tab === 'all' && (
                        <Grid container spacing={2}>
                            {Resault.data.hotest[0].map((item, index) => {
                                return (
                                    <Grid item md={2.4} xs={4}>
                                        <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                                            <Card>
                                                <img src={hostUrl + item.bannerimage} className="header-image"/>
                                                <img src={hostUrl + item.logoimage} className="profile-image" />
                                                <h5>{item.Name}</h5>
                                                <p>{item.Description}</p>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                            {Resault.data.favorites[0].map((item, index) => {
                                return (
                                    <Grid item md={2.4} xs={4}>
                                        <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                                            <Card>
                                                <img src={hostUrl + item.bannerimage} className="header-image"/>
                                                <img src={hostUrl + item.logoimage} className="profile-image" />
                                                <h5>{item.Name}</h5>
                                                <p>{item.Description}</p>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                            {Resault.data.latest[0].map((item, index) => {
                                return (
                                    <Grid item md={2.4} xs={4}>
                                        <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                                            <Card>
                                                <img src={hostUrl + item.bannerimage} className="header-image"/>
                                                <img src={hostUrl + item.logoimage} className="profile-image" />
                                                <h5>{item.Name}</h5>
                                                <p>{item.Description}</p>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                    {Resault.data && tab === 'hotest' && (
                        <Grid container spacing={2}>
                            {Resault.data.hotest[0].map((item, index) => {
                                return (
                                    <Grid item md={2.4} xs={4}>
                                        <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                                            <Card>
                                                <img src={hostUrl + item.bannerimage} className="header-image"/>
                                                <img src={hostUrl + item.logoimage} className="profile-image" />
                                                <h5>{item.Name}</h5>
                                                <p>{item.Description}</p>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                    {Resault.data && tab === 'favorites' && (
                        <Grid container spacing={2}>
                            {Resault.data.favorites[0].map((item, index) => {
                                return (
                                    <Grid item md={2.4} xs={4}>
                                        <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                                            <Card>
                                                <img src={hostUrl + item.bannerimage} className="header-image"/>
                                                <img src={hostUrl + item.logoimage} className="profile-image" />
                                                <h5>{item.Name}</h5>
                                                <p>{item.Description}</p>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                    {Resault.data && tab === 'latest' && (
                        <Grid container spacing={2}>
                            {Resault.data.latest[0].map((item, index) => {
                                return (
                                    <Grid item md={2.4} xs={4}>
                                        <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                                            <Card>
                                                <img src={hostUrl + item.bannerimage} className="header-image"/>
                                                <img src={hostUrl + item.logoimage} className="profile-image" />
                                                <h5>{item.Name}</h5>
                                                <p>{item.Description}</p>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default Explore;