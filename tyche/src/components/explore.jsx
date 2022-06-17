import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Tab, Tabs, Container, Card } from '@mui/material';
import { hostUrl } from '../host-url';
import { callAPI } from "../components/api-call";
import { margin, textAlign } from '@mui/system';
import { Input, Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Explore = () => {

    const [tab, setTab] = useState('all');
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const [resault, setResault] = useState([]);
    const [sortcollection, setSortcollection] = useState([]);
    const [sortNftPrice, setSortnftprice] = useState([]);
    const [filterResualt, setFilterResualt] = useState([]);
    const [nftShow, setNftShow] = useState(false);
    


    useEffect(() => {
        const data = new FormData();
        data.append("hotest", "true");
        data.append("favorites", "true");
        data.append("latest", "true");
        callAPI({ method: 'POST', url: `https://api.ludushub.io/explore`, data: data }).then(response => {
            setResault(response.payload);
        });
    }, []);
   useEffect(() => {
        const data = new FormData();
        data.append("params", "liked");
        data.append("kind", "ascending");
        callAPI({ method: 'POST', url: `https://api.ludushub.io/sortCollection`, data: data }).then(response => {
            setSortcollection(response.payload);
        });
    },[]);
   useEffect(() => {
        const data = new FormData();
        data.append("params", "price");
        data.append("kind", "descending");
        callAPI({ method: 'POST', url: `https://api.ludushub.io/sortNFT`, data: data }).then(response => {
            setSortnftprice(response.payload);
        });
    },[]);
    const FindNFT=()=>{
        if (min < max)
        {
            setNftShow(true);
            const data = new FormData();
            data.append("price_l", min);
            data.append("price_h", max);
            data.append("blockchain", "Ether");
            callAPI({ method: 'POST', url: `https://api.ludushub.io/filterNFT`, data: data }).then(response => {
                setFilterResualt(response.payload);
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
        {!nftShow && <main className='mainbody'>
        <Container maxWidth="xl">
            <div className="explore-container">
                <h3 className="explore-title">مجموعه ات را پیدا کن</h3>
                <div className="tab-container">
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="همه" value="all" />
                        <Tab label="پر طرفدار ها" value="favorites" />
                        {/* <Tab label="جذاب‌ترین‌ها" value="hotest" />
                        <Tab label="آخرین‌ها" value="latest" /> */}
                    </Tabs>
                    {resault.data && tab === 'all' && (
                        <Grid container spacing={2}>
                            {resault.data.hotest[0].map((item, index) => {
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
                            {resault.data.favorites[0].map((item, index) => {
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
                            {resault.data.latest[0].map((item, index) => {
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
                    {resault.data && tab === 'hotest' && (
                        <Grid container spacing={2}>
                            {resault.data.hotest[0].map((item, index) => {
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
                    {sortcollection.data && tab === 'favorites' && (
                        <Grid container spacing={2}>
                            {sortcollection.data.map((item, index) => {
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
                    {resault.data && tab === 'latest' && (
                        <Grid container spacing={2}>
                            {resault.data.latest[0].map((item, index) => {
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
        </main>}
        {nftShow && <main className='mainbody'>
            <Container>
            <div className="explore-container">
            <h3 className="explore-title">NFT ها بر اساس فیلتر انتخابی</h3>
            {filterResualt.data && <Grid container spacing={2}>
                {filterResualt.data.map((item, index) => {
                    return (
                        <Grid item md={2.4} xs={4}>
                            <Link to={`/product/${item.id}`} className="nft-collection-parent">
                                <Card>
                                    <img src={hostUrl + item.bannerimage} className="header-image"/>
                                    <img src={hostUrl + item.logoimage} className="profile-image"/>
                                    <h5>{item.Name}</h5>
                                    <p>{item.Description}</p>
                                </Card>
                            </Link>
                        </Grid>
                    );
                    })}
                </Grid>}
             <Grid container spacing={2}>
            </Grid>
            </div>
            </Container>
        </main>}
        </div>
    );
}


export default Explore;