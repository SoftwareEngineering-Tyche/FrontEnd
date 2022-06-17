import React, { useState, useEffect } from "react";
import "../assets/styles/search-page.scss";
import { Button, Divider, Grid, ButtonGroup, Accordion, AccordionSummary, AccordionDetails, Modal, Box, TextField } from "@mui/material";
import imageSample from "../assets/images/image.png";
import 'bootstrap/dist/css/bootstrap.css';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import Like from "../components/like";
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import LinkIcon from '@mui/icons-material/Link';
import NftCarousel from "../components/nft-carousel";
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";
import { ethers } from "ethers";
import Web3 from 'web3';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useMoralis, MoralisProvider } from "react-moralis";
import Moralis from "moralis";
import { contractABI, contractAddress } from "../contract";
import { useParams } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Link } from '@mui/material';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SearchPage(props) {
    const [searchResults, setSearchResults] = useState();
    const { text } = useParams();
    useEffect(() => {
        const data = new FormData();
        data.append("search", text);
        callAPI({ method: 'POST', url: `https://api.ludushub.io/search`, data: data }).then(response => {
            setSearchResults(response.payload);
        });
    }, [text]);
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
                            <div style={{ color: '#CDBDFF', display: 'flex', justifyContent: 'center', fontSize: 'small', textAlign:'center' }}>{item.Description}</div>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        );
    }
    return (
        <div className="search-page-container">
            {searchResults && searchResults.data &&
                <div className="search-page">
                    {searchResults.data.collections && searchResults.data.collections.length > 0 &&
                        <div className="section">
                            <div>
                                <div className="section-title">کلکسیون ها</div>
                                <div className="d-flex flex-wrap">
                                    {searchResults.data.collections.map((collection, index) => {
                                        return (getCard(collection, 'collection'));
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                    {searchResults.data.NFTs && searchResults.data.NFTs.length > 0 &&
                        <div className="section">
                            <div>
                                <div className="section-title">آثار</div>
                                <div className="d-flex flex-wrap">
                                    {searchResults.data.NFTs.map((product, index) => {
                                        return (getCard(product, 'product'));
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                    {/* {searchResults.data.accounts && searchResults.data.accounts.length > 0 &&
                        <div className="section">
                            <div>
                                <div className="section-title">اشخاص</div>
                                <div className="d-flex flex-wrap">
                                    {searchResults.data.accounts.map((account, index) => {
                                        return (getCard(account, 'account'));
                                    })}
                                </div>
                            </div>
                        </div>
                    } */}
                </div>
            }
        </div>
    );
}
export default SearchPage;