import React, { useState, useEffect } from "react";
import "../assets/styles/product-page.scss";
import { Button, Divider, Link, Grid, ButtonGroup, Accordion, AccordionSummary, AccordionDetails, Modal, Box, TextField } from "@mui/material";
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
// import { useNavigate, useHistory } from "react-router-dom";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth > 768 ? '35%' : '95%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};
function ProductPage() {
    const [name, setName] = useState("نامشخص");
    const [likeCount, setLikeCount] = useState(0);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState();
    const [imageFile, setImageFile] = useState();
    const [externalLink, setExternalLink] = useState(null);
    const [price, setPrice] = useState();
    const [collection, setCollection] = useState();
    const [properties, setProperties] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [isOpenOfferModal, setIsOpenOfferModal] = useState(false);
    const [balance, setBalance] = useState();
    const [offerPrice, setOfferPrice] = useState();
    const [ethAccount, setEthAccount] = useState();
    const [offers, setOffers] = useState();
    const [offerErrorMessage, setOfferErrorMessage] = useState();
    const [isSubmitOfferSucceeded, setIsSubmitOfferSucceeded] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const [owner, setOwner] = useState();
    // let navigate = useNavigate();

    useEffect(async () => {
        const owner = await contract.methods.ownerOf(2);
        console.log("owner", owner)
        if (window.ethereum !== undefined) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                setEthAccount(accounts[0]);
            })
        }
        callAPI({ method: "GET", url: `${hostUrl}/WorkArt/${window.location.pathname.split('/')[2]}` }).then(response => {
            console.log("response.status", response.status);
            if (response.payload.Name !== 'null') setName(response.payload.Name);
            if (response.payload.Liked) setLikeCount(response.payload.Liked);
            if (response.payload.Description !== 'null') setDescription(response.payload.Description);
            if (response.payload.Externallink !== 'null') setExternalLink(response.payload.Externallink);
            if (response.payload.Price) setPrice(response.payload.Price);
            if (response.payload.collections && response.payload.collections.length > 0)
                setCollection(response.payload.collections[0]);
            if (response.payload.image && !response.payload.image.includes('undefined') && !response.payload.image.includes('null'))
                setImage((hostUrl + response.payload.image));
            fetch(document.getElementById('image').src).then(res => res.blob()).then(blob => {
                setImageFile(new File([blob], 'workArt.jpg', blob));
            })
        });
        callAPI({ method: "GET", url: `${hostUrl}/WorkArtProperty/${window.location.pathname.split('/')[2]}` }).then(response => {
            setProperties(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/WorkArtstatistic/${window.location.pathname.split('/')[2]}` }).then(response => {
            setStatistics(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/WorkArtOffer/${window.location.pathname.split('/')[2]}` }).then(response => {
            setOffers(response.payload);
            console.log(response.payload);
        });
        callAPI({ method: "GET", url: `${hostUrl}/workartwalletinfo/${window.location.pathname.split('/')[2]}` }).then(response => {
            setOwner(response.payload);
        });
    }, []);

    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: 'اشتراک گذاری اثر - تایکی',
                text: window.location.href,
            }).then(() => console.log('Successful share')).catch(() => console.log('Error sharing'));
        }
    }

    async function handleOpenOfferModal() {
        try {
            const correctedAccount = web3.utils.toChecksumAddress(ethAccount);
            const balanceInWei = await web3.eth.getBalance(correctedAccount);
            setBalance(
                Number(web3.utils.fromWei(balanceInWei, 'ether')).toFixed(5),
            );
        } catch (error) {
            console.log(error.message);
        }
        setIsOpenOfferModal(true);
    }

    async function handleBuybtnClick(e) {
        e.preventDefault();
        setIsLoading(true);
        let appId = process.env.REACT_APP_APP_ID;
        let serverUrl = process.env.REACT_APP_SERVER_URL;
        Moralis.start({ serverUrl, appId });
        let productTokenId = localStorage.getItem(window.location.pathname.split('/')[2]);
        try {
            // const response = await contract.methods.transferFrom(contractAddress, "0xA66956d157def004840A47508fA6051B3B14f0ba", productTokenId);
            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: owner,
                        to: ethAccount,
                        value: parseInt(web3.utils.toWei(`${price}`, "ether")).toString(16),
                    },
                ],
            }).then((txHash) => console.log(txHash)).catch((error) => console.log(error));

        } catch (err) {
            console.log("Something went wrong!");
        }
        setIsLoading(false);
    }

    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    const handleSubmitOffer = () => {
        if (offerPrice > balance) {
            setOfferErrorMessage("قیمت پیشنهادی از موجودی شما بیشتر می‌باشد!")
        }
        else {
            const data = new FormData();
            data.append("From", ethAccount);
            data.append("Price", offerPrice);
            callAPI({ method: "POST", url: `${hostUrl}/WorkArtOffer/${window.location.pathname.split('/')[2]}`, data: data });
            setIsSubmitOfferSucceeded(true);
            setIsOpenOfferModal(false);
        }
    }

    const handleAcceptOffer = (offerID) => {
        const data = new FormData();
        data.append("status", "accepted");
        data.append("workArtID", window.location.pathname.split('/')[2])
        callAPI({ method: "POST", url: `${hostUrl}/worrkartofferaccept/${offerID}`, data: data });
    }

    const handleRejectOffer = (offerID) => {
        const data = new FormData();
        data.append("status", "rejected");
        data.append("workArtID", window.location.pathname.split('/')[2])
        callAPI({ method: "POST", url: `${hostUrl}/worrkartofferaccept/${offerID}`, data: data });
    }

    const getAccountInfo = (acc) => {
        callAPI({ method: "GET", url: `${hostUrl}/Account/${acc}` }).then(response => {
            return response;
        });
    }

    const handleGoToUserProfile = (user) => {
        // navigate(`/user-profile/${user}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="product-page">
            <Snackbar open={isSubmitOfferSucceeded} autoHideDuration={3000} onClose={() => setIsSubmitOfferSucceeded(false)}>
                <Alert onClose={() => setIsSubmitOfferSucceeded(false)} severity="success" sx={{ width: '100%' }}>
                    پیشنهاد شما با موفقیت ثبت شد!
                </Alert>
            </Snackbar>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className="product-preview">
                        {!image ? <img src={imageSample} width={'100%'} /> : <img id="image" src={image} width={'100%'} />}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="d-flex justify-content-between">
                        <Link href={`/collection/${collection}`}>
                            <Button>مشاهده کلکسیون این اثر</Button>
                        </Link>
                        <ButtonGroup variant="outlined">
                            <Button classes={{ root: 'action-btn' }} onClick={() => window.location.reload()}>
                                <RefreshRoundedIcon />
                            </Button>
                            <Button classes={{ root: 'action-btn' }} onClick={shareProduct}>
                                <ShareRoundedIcon />
                            </Button>
                            <Button classes={{ root: 'action-btn' }}>
                                <Like product={window.location.pathname.split('/')[2]} />
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="m-2 h2"> نام اثر : {name}</div>
                    <div className="mx-2 text-secondary">{likeCount} نفر این اثر را پسندیده‌اند</div>
                    <div className="price-container">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                                قیمت فعلی :
                                <span> <img src={ethereumIcon} height={16} />{price}</span>
                                {/* <span className="mx-1 text-secondary">(${convert(price, 'ether', 'tether')})</span> */}
                            </Grid>
                            <Grid item xs={12} md={6} justifyContent="space-between" sx={{ display: 'flex' }}>
                                <Button variant="contained" classes={{ root: 'action buy' }} onClick={handleBuybtnClick}>
                                    خرید آنی
                                </Button>
                                <Button variant="outlined" classes={{ root: 'action offer' }} onClick={handleOpenOfferModal}>
                                    پیشنهاد قیمت
                                </Button>
                            </Grid>
                        </Grid>
                        <Modal open={isOpenOfferModal} onClose={() => setIsOpenOfferModal(false)}>
                            {/*balance && */<Box sx={modalStyle} className="property-modal">
                                <div className="d-flex justify-content-center">پیشنهاد قیمت خود را برای این محصول ثبت کنید</div>
                                <Divider className="my-2" />
                                <div className="d-flex justify-content-between">
                                    <div>موجودی کیف پول شما :</div>
                                    <div className="d-flex  mb-4">
                                        <span className="text-secondary">ETH</span>&nbsp;
                                        <span className="text-secondary">{round(balance, 4)}</span>
                                    </div>
                                </div>
                                <TextField
                                    fullWidth
                                    label="پیشنهاد شما"
                                    value={offerPrice}
                                    onChange={e => setOfferPrice(e.target.value)}
                                />
                                {offerPrice > balance && <div className="text-danger mt-1">{offerErrorMessage}</div>}
                                <div className="d-flex flex-row-reverse mt-3">
                                    <Button variant="outlined" onClick={handleSubmitOffer}>ثبت پیشنهاد</Button>
                                </div>
                            </Box>}
                        </Modal>
                    </div>
                    <div className="my-2">
                        <Accordion classes={{ root: 'accordion' }} defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <CommentRoundedIcon />
                                <span className="mx-2">توضیحات</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                {description}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="my-2">
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <LinkIcon />
                                <span className="mx-2">لینک خارجی</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                <Link href={`http://${externalLink}`}>{externalLink}</Link>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="my-2">
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <ViewListRoundedIcon sx={{ transform: "rotate(180deg)" }} />
                                <span className="mx-2">ویژگی‌ها</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                {properties && properties.length > 0 ?
                                    properties.map((prop, index) => {
                                        return (
                                            <div className="d-flex justify-content-between mx-1">
                                                <span>{prop.subject}</span>
                                                <span>{prop.value}</span>
                                            </div>
                                        );
                                    })
                                    :
                                    <span>ویژگی برای این اثر ثبت نشده است</span>
                                }
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div>
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <ViewListRoundedIcon sx={{ transform: "rotate(180deg)" }} />
                                <span className="mx-2">آمار</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                {statistics && statistics.length > 0 ?
                                    statistics.map((stat, index) => {
                                        return (
                                            <div className="d-flex justify-content-between mx-1">
                                                <span>{stat.subject}</span>
                                                <span>{stat.value}</span>
                                            </div>
                                        );
                                    })
                                    :
                                    <span>آماری برای این اثر ثبت نشده است</span>
                                }
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {/* <div className="my-2">
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <BallotRoundedIcon sx={{ transform: "rotate(180deg)" }} />
                                <span className="mx-2">جزئیات</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                جزئیات مربوط به اثر
                            </AccordionDetails>
                        </Accordion>
                    </div> */}

                </Grid>
                <Grid item xs={12}>
                    <div className="my-2">
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <LocalOfferRoundedIcon />
                                <span className="mx-2">پیشنهادهای قیمت</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">قیمت پیشنهادی (ETH)</TableCell>
                                                <TableCell align="center">تاریخ</TableCell>
                                                <TableCell align="center">شخص</TableCell>
                                                <TableCell align="center">تعیین وضعیت</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {offers && offers.length > 0 && offers.map((offer) => (
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell align="center">
                                                        <div className="">
                                                            <span className="text-secondary">{offer.Price}</span>&nbsp;
                                                        </div>
                                                    </TableCell>
                                                    {offer.Date &&
                                                        <TableCell align="center">
                                                            {(offer.Date.replace("T", " ")).replace("-", "/").replace("-", "/")}
                                                        </TableCell>
                                                    }

                                                    <TableCell align="center" onClick={() => handleGoToUserProfile(offer.From)}>
                                                        <Link href={`/user-profile/${offer.From}`}>
                                                            <Button variant="outlined">
                                                                {offer.From?.slice(0, 5)}...{offer.From?.slice(-3)}
                                                            </Button>
                                                        </Link>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <div>
                                                            {offer.status === "accepted" &&
                                                                <span>قبول شده</span>
                                                            }
                                                            {offer.status === "rejected" &&
                                                                <span>رد شده</span>
                                                            }
                                                            {offer.status === "Pending" && <>
                                                                {owner === ethAccount ?
                                                                    <ButtonGroup variant="outlined">
                                                                        <Button classes={{ root: 'action-btn' }} onClick={() => handleAcceptOffer(offer.id)}>
                                                                            قبول
                                                                        </Button>
                                                                        <Button classes={{ root: 'action-btn' }} onClick={() => handleRejectOffer(offer.id)}>
                                                                            رد
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                    :
                                                                    <span>در حال بررسی</span>
                                                                }
                                                            </>}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
            </Grid>
            <NftCarousel title="آثار دیگر این کلکسیون" product={window.location.pathname.split('/')[2]} />
        </div>
    );
}
export default ProductPage;