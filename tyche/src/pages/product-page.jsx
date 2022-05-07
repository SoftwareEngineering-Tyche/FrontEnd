import React, { useState, useEffect } from "react";
import "../assets/styles/product-page.scss";
import { Button, Divider, Link, Grid, ButtonGroup, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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

    useEffect(() => {
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
    }, []);

    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: 'اشتراک گذاری اثر - تایکی',
                text: window.location.href,
            }).then(() => console.log('Successful share')).catch(() => console.log('Error sharing'));
        }
    }

    return (
        <div className="product-page">
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
                                <Button variant="contained" classes={{ root: 'action buy' }}>
                                    خرید آنی
                                </Button>
                                <Button variant="outlined" classes={{ root: 'action offer' }}>
                                    پیشنهاد قیمت
                                </Button>
                            </Grid>
                        </Grid>
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
                                                <span>{prop.keyId}</span>
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
                                                <span>{stat.keyId}</span>
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
                                لیست پیشنهادها
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