import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Tab, Tabs, Container, Card, Alert } from '@mui/material';
import { hostUrl } from '../host-url';
import { callAPI } from "../components/api-call";
import { Input, Button, TextField, Slide } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../assets/styles/explore.scss";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Explore = () => {

    const [tab, setTab] = useState('all');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [resault, setResault] = useState([]);
    const [sortcollection, setSortcollection] = useState([]);
    const [sortNftPrice, setSortnftprice] = useState([]);
    const [filterResualt, setFilterResualt] = useState([]);
    const [nftShow, setNftShow] = useState(false);
    const [isShowFiltersBottomSheet, setIsShowFiltersBottomSheet] = useState(false);

    useEffect(async () => {
        const data = new FormData();
        data.append("hotest", "true");
        data.append("favorites", "true");
        data.append("latest", "true");
        callAPI({ method: 'POST', url: `${hostUrl}/explore`, data: data }).then(response => {
            setResault(response.payload);
        });
    }, []);
    useEffect(async () => {
        const data = new FormData();
        data.append("params", "liked");
        data.append("kind", "ascending");
        callAPI({ method: 'POST', url: `${hostUrl}/sortCollection`, data: data }).then(response => {
            setSortcollection(response.payload);
        });
    }, []);
    useEffect(() => {
        const data = new FormData();
        data.append("params", "price");
        data.append("kind", "descending");
        callAPI({ method: 'POST', url: `${hostUrl}/sortNFT`, data: data }).then(response => {
            setSortnftprice(response.payload);
        });
    }, []);
    const FindNFT = () => {
        if (min < max) {
            setNftShow(true);
            setFilterResualt([]);
            const data = new FormData();
            data.append("price_l", min);
            data.append("price_h", max);
            data.append("blockchain", "Ether");
            callAPI({ method: 'POST', url: `${hostUrl}/filterNFT`, data: data }).then(response => {
                setFilterResualt(response.payload);
            });
        }
        setIsShowFiltersBottomSheet(false);
    }

    const clearFilteredResult = () => {
        setFilterResualt([]);
        setNftShow(false);
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    const getCollectionCard = (item, index) => (
        <Grid item md={2.4} xs={6} key={index}>
            <Link to={`/collection/${item.id}`} className="nft-collection-parent">
                <Card sx={{ borderRadius: '12px' }}>
                    <img src={hostUrl + item.bannerimage} className="header-image" />
                    <img src={hostUrl + item.logoimage} className="profile-image" />
                    <h5>{item.Name}</h5>
                    <p>{item.Description}</p>
                </Card>
            </Link>
        </Grid>
    )

    return (
        <div className="explore" data-test="main-body">
            {window.innerWidth <= 768 && <>
                <Button onClick={() => setIsShowFiltersBottomSheet(true)} variant="outlined" sx={{ margin: '8px 0 0 8px' }}>فیلتر ها</Button>
                <Slide in={isShowFiltersBottomSheet} direction="up">
                    <div className='bottom-sheet'>
                        <div className='header'>
                            <span>فیلتر ها</span>
                            <KeyboardArrowDownRoundedIcon onClick={() => setIsShowFiltersBottomSheet(false)} />
                        </div>
                        <div>
                            <TextField fullWidth type="number" label="حداقل" value={min} onChange={e => setMin(e.target.value)} InputLabelProps={{ shrink: true }}
                                sx={{ margin: '28px 0 16px 0' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                }}
                                data-test="min-input"
                            />
                            <TextField fullWidth type="number" label="حداکثر" value={max} min="0" onChange={e => setMax(e.target.value)} InputLabelProps={{ shrink: true }}
                                sx={{ margin: '16px 0' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                }}
                                data-test="max-input"
                            />
                            <Button className="findbtn" data-test="filter-button" onClick={FindNFT}>
                                پیدا کن
                            </Button>
                        </div>
                    </div>
                </Slide>
            </>}
            {!nftShow &&
                <div className="explore-container">
                    <Grid container spacing={2}>
                        {window.innerWidth > 768 && <Grid item xs={3}>
                            <aside className='browse-sidebar' style={{margin: '0 16px 0 200px'}}>
                                <h5 className='filterbox_title'>فیلتر ها</h5>
                                <hr></hr>
                                <div className='filter_gheymat'>
                                    <h5 className='gheymat_title'>قیمت :</h5>
                                    <div>
                                        <label className='min-max-parent'>
                                            <div>
                                                <TextField fullWidth type="number" data-test="min-input" label="حداقل" value={min} onChange={e => setMin(e.target.value)} InputLabelProps={{ shrink: true }}
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
                                                <TextField fullWidth type="number" data-test="max-input" label="حداکثر" value={max} min="0" onChange={e => setMax(e.target.value)} InputLabelProps={{ shrink: true }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <Button className="findbtn" data-test="filter-button" onClick={FindNFT}>
                                            پیدا کن
                                        </Button>
                                    </div>
                                </div>
                            </aside>
                        </Grid>}
                        <Grid md={9} xs={12}>
                            <h3 className="explore-title">مجموعه ات را پیدا کن</h3>
                            <div className="tab-container">
                                <Tabs value={tab} data-test="explore-tabs" onChange={handleChange}>
                                    <Tab label="همه" value="all" />
                                    <Tab label="پر طرفدار ها" value="favorites" />
                                    {/* <Tab label="جذاب‌ترین‌ها" value="hotest" />
                                <Tab label="آخرین‌ها" value="latest" /> */}
                                </Tabs>
                                {resault.data && tab === 'all' && (
                                    <Grid container spacing={2} justifyContent="center">
                                        {resault.data.hotest[0].map((item, index) => (
                                            getCollectionCard(item, index)
                                        ))}
                                        {resault.data.favorites[0].map((item, index) => (
                                            getCollectionCard(item, index)
                                        ))}
                                        {resault.data.latest[0].map((item, index) => (
                                            getCollectionCard(item, index)
                                        ))}
                                    </Grid>
                                )}
                                {resault.data && tab === 'hotest' && (
                                    <Grid container spacing={2}>
                                        {resault.data.hotest[0].map((item, index) => (
                                            getCollectionCard(item, index)
                                        ))}
                                    </Grid>
                                )}
                                {sortcollection.data && tab === 'favorites' && (
                                    <Grid container spacing={2}>
                                        {sortcollection.data.map((item, index) => (
                                            getCollectionCard(item, index)
                                        ))}
                                    </Grid>
                                )}
                                {resault.data && tab === 'latest' && (
                                    <Grid container spacing={2}>
                                        {resault.data.latest[0].map((item, index) => (
                                            getCollectionCard(item, index)
                                        ))}
                                    </Grid>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            }
            {nftShow &&
                <div className="explore-container">
                    <Grid container spacing={2}>
                        {window.innerWidth > 768 && <Grid item xs={3}>
                            <aside className='browse-sidebar'>
                                <h5 className='filterbox_title'>فیلتر ها</h5>
                                <hr></hr>
                                <div className='filter_gheymat'>
                                    <h5 className='gheymat_title'>قیمت :</h5>
                                    <div>
                                        <label className='min-max-parent'>
                                            <div>
                                                <TextField fullWidth type="number" label="حداقل" value={min} onChange={e => setMin(e.target.value)} InputLabelProps={{ shrink: true }}
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
                                                <TextField fullWidth type="number" label="حداکثر" value={max} onChange={e => setMax(e.target.value)} InputLabelProps={{ shrink: true }}
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
                                        <Button className="findbtn reset-find-btn" onClick={clearFilteredResult} style={{ marginTop: 10 }}>
                                            بازگشت
                                        </Button>
                                    </div>
                                </div>
                            </aside>
                        </Grid>}
                        <Grid md={9} xs={12}>
                            <h3 className="explore-title">NFT ها بر اساس فیلتر انتخابی</h3>
                            {filterResualt.data && filterResualt.data.length > 0 ?
                                <Grid container spacing={2}>
                                    {filterResualt.data.map((item, index) => (
                                        <Grid item md={2.4} xs={6} key={index}>
                                            <Link to={`/product/${item.id}`} className="nft-collection-parent">
                                                <Card sx={{ borderRadius: '12px' }}>
                                                    <img src={hostUrl + item.image} className="header-image" />
                                                    <h5>{item.Name}</h5>
                                                    <p>{item.Description}</p>
                                                    <p id='nftfilter-price'>{item.Price}ETH</p>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                                :
                                <Grid container spacing={2}>
                                    <Alert severity="info">بر اساس فیلتر مورد نظر NFT یافت نشد</Alert>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}


export default Explore;