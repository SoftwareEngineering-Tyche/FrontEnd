import React, { useState, useEffect } from "react";
import "../assets/styles/search-page.scss";
import { Button, Divider, Grid, ButtonGroup, Accordion, AccordionSummary, AccordionDetails, Modal, Box, TextField } from "@mui/material";
import imageSample from "../assets/images/image.png";
import 'bootstrap/dist/css/bootstrap.css';
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";
import Web3 from 'web3';
import MuiAlert from '@mui/material/Alert';
import { useMoralis, MoralisProvider } from "react-moralis";
import Moralis from "moralis";
import { contractABI, contractAddress } from "../contract";
import { useParams } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Link } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import notFoundIcon from '../assets/images/not-found.svg';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SearchPage(props) {
    const [searchResults, setSearchResults] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { text } = useParams();
    useEffect(() => {
        setIsLoading(true)
        const data = new FormData();
        data.append("search", text);
        callAPI({ method: 'POST', url: `https://api.ludushub.io/search`, data: data }).then(response => {
            setSearchResults(response.payload);
            setIsLoading(false);
        });
    }, [text]);
    function getCard(item, mode) {
        return (
            <Card sx={{ borderRadius: '16px', overflow: 'unset', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link
                    underline="none"
                    href={mode === 'product' ? `/product/${item.id}` : mode=== 'collection' ? `/collection/${item.id}` : `/user-profile/${item.WalletInfo}`}
                >
                    <CardActionArea sx={{ width: '220px', margin: '8px' }}>
                        <div style={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia sx={{ display: 'flex', justifyContent: 'center', padding: '4px', margin: '0px' }}>
                                {mode === 'product' && <img src={hostUrl + item.image} width={150} height={150} />}
                                {mode === 'collection' && <img src={hostUrl + item.logoimage} width={150} height={150} style={{ borderRadius: '50%' }} />}
                                {mode === 'account' && <img src={item.avatar ? hostUrl + item.avatar : imageSample} width={150} height={150} style={{ borderRadius: '50%' }} />}
                            </CardMedia>
                        </div>
                        <CardContent sx={{ padding: '8px 16px', height: '30%' }}>
                            <div style={{ color: '#2F3A8F', display: 'flex', justifyContent: 'center' }}>
                                {mode === 'account' ? item.username : item.Name}
                            </div>
                            <div style={{ color: '#CDBDFF', display: 'flex', justifyContent: 'center', fontSize: 'small', textAlign: 'center' }}>{item.Description}</div>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card >
        );
    }
    if (isLoading)
        return (
            <div className="loading">
                <CircularProgress />
            </div>
        );
    else
        return (
            <div className="search-page-container">
                {searchResults && searchResults.data &&
                    <Grid container spacing={0} xs={12} className="search-page">
                        {searchResults.data.collections && searchResults.data.collections.length > 0 &&
                            <Grid item xs={12} md={12} className="section" justifyContent='center'>
                                <div className="section-title">کلکسیون ها</div>
                                <Grid container spacing={1} justifyContent='center'>
                                    {searchResults.data.collections.map((collection, index) => {
                                        return (
                                            <Grid item xs={6} sm={4} md={3} lg={2} className="">
                                                {getCard(collection, 'collection')}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        }
                        {searchResults.data.NFTs && searchResults.data.NFTs.length > 0 &&
                            <Grid item xs={12} md={12} className="section" justifyContent='center'>
                                <div className="section-title">آثار</div>
                                <Grid container spacing={1} justifyContent='center'>
                                    {searchResults.data.NFTs.map((product, index) => {
                                        return (
                                            <Grid item xs={6} sm={4} md={3} lg={2} className="">
                                                {getCard(product, 'product')}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        }
                        {searchResults.data.accounts && searchResults.data.accounts.length > 0 &&
                            <Grid item xs={12} md={12} className="section" justifyContent='center'>
                                <div className="section-title">اشخاص</div>
                                <Grid container spacing={1} justifyContent='center'>
                                    {searchResults.data.accounts.map((account, index) => {
                                        return (
                                            <Grid item xs={6} sm={4} md={3} lg={2} className="">
                                                {getCard(account, 'account')}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        }
                        {searchResults.data.NFTs && searchResults.data.NFTs.length === 0 &&
                            searchResults.data.collections && searchResults.data.collections.length === 0 &&
                            searchResults.data.accounts && searchResults.data.accounts.length === 0 &&
                            <div className="not-found-section">
                                <div>
                                    <img src={notFoundIcon} />
                                    <div>نتیجه‌ای یافت نشد</div>
                                </div>
                            </div>
                        }
                    </Grid>
                }
            </div>
        );
}
export default SearchPage;