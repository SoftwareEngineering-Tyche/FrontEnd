import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Tab, Tabs, Container, Card } from '@mui/material';
import { hostUrl } from '../host-url';
import { callAPI } from "../components/api-call";
import { margin, textAlign } from '@mui/system';
import { Input, Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const Explore = () => {

    const [tab, setTab] = useState('all');
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const [Resault, setResault] = useState([]);
    const [Sortcollection, setSortcollection] = useState([]);
    const [Sortnftprice, setSortnftprice] = useState([]);
    const [Filterresualt, setFilterresualt] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append("hotest", "true");
        data.append("favorites", "true");
        data.append("latest", "true");
        callAPI({ method: 'POST', url: `hostUrl/explore`, data: data }).then(response => {
            setResault(response.payload);
        });
    }, []);
   const useEffectSortCollection=() => {
        const data = new FormData();
        data.append("params", "liked");
        data.append("kind", "ascending");
        callAPI({ method: 'POST', url: `hostUrl/sortCollection`, data: data }).then(response => {
            setSortcollection(response.payload);
        });
    };
   const useEffectSortNFT=() => {
        const data = new FormData();
        data.append("params", "price");
        data.append("kind", "descending");
        callAPI({ method: 'POST', url: `hostUrl/sortNFT`, data: data }).then(response => {
            setSortnftprice(response.payload);
        });
    };
    const FindNFT=()=>{
        if (min < max)
        {const data = new FormData();
            data.append("hotest", "true");
            data.append("favorites", "true");
            data.append("latest", "true");
            callAPI({ method: 'POST', url: `hostUrl/`, data: data }).then(response => {
                setFilterresualt(response.payload);
            });}
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }
    return (
        <div>
            <aside className='browse-sidebar'>
                <h5 className='filterbox_title'>فیلتر ها</h5>
                <hr></hr>
                <div className='filter_gheymat'>
                    <h5 className='gheymat_title'>قیمت :</h5>
                    <div>
                    <label className='min-max-parent'>
                            <div>
                              
                                <TextField fullWidth type="number" label="حداقل" value={min} onChange={e=>setMin(e.target.value)} InputLabelProps={{ shrink:true }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                  }}
                                />
                                
                            </div>
                    </label>
                    </div>
                    <div>
                    <label className='min-max-parent'>
                            <div>
                                
                                <TextField fullWidth type="number" label="حداکثر" value={max} onChange={e=>setMax(e.target.value)} InputLabelProps={{ shrink:true }} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                  }}
                                />
                               
                            </div>
                    </label>
                    </div>
                    <div>
                    <Button className="findbtn" onClick={FindNFT}>
                            پیدا کن
                        </Button>
                    </div>
                </div>
            </aside>
        <main className='mainbody'>
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
                    {Sortcollection.data && tab === 'favorites' && (
                        <Grid container spacing={2}>
                            {Sortcollection.data.favorites[0].map((item, index) => {
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
        </main>
        </div>
    );
}


export default Explore;