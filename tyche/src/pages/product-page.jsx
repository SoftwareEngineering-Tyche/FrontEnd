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
import NftCarousel from "../components/nft-carousel";

function ProductPage() {
    const [name, setName] = useState("");

    useEffect(() => {

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
                        <img src={imageSample} width={'100%'} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="d-flex justify-content-between">
                        <Button>نام کلکسیون</Button>
                        <ButtonGroup variant="outlined">
                            <Button classes={{ root: 'action-btn' }} onClick={() => window.location.reload()}>
                                <RefreshRoundedIcon />
                            </Button>
                            <Button classes={{ root: 'action-btn' }} onClick={shareProduct}>
                                <ShareRoundedIcon />
                            </Button>
                            <Button classes={{ root: 'action-btn' }}>
                                {Like()}
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="m-2 h2">نام اثر</div>
                    <div className="mx-2 text-secondary">صاحب اثر : فلانی</div>
                    <div className="mx-2 text-secondary">0 نفر این اثر را پسندیده‌اند</div>
                    <div className="price-container">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                                قیمت فعلی :
                                <span> <img src={ethereumIcon} height={16} />210</span>
                                <span className="mx-1 text-secondary">($606,635.40)</span>
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
                                توضیحات مربوط به اثر
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div>
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <ViewListRoundedIcon sx={{ transform: "rotate(180deg)" }} />
                                <span className="mx-2">ویژگی‌ها</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                ویژگی‌های اثر
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="my-2">
                        <Accordion classes={{ root: 'accordion' }}>
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{ root: 'icon' }} />} classes={{ root: 'accordion-summery' }}>
                                <BallotRoundedIcon sx={{ transform: "rotate(180deg)" }} />
                                <span className="mx-2">جزئیات</span>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: 'accordion-detail' }}>
                                جزئیات مربوط به اثر
                            </AccordionDetails>
                        </Accordion>
                    </div>
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
            <NftCarousel title="آثار دیگر این کلکسیون" />
        </div>
    );
}
export default ProductPage;