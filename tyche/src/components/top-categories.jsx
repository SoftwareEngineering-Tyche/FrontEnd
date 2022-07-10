import React, { useRef, useState, useEffect } from "react";
import "../assets/styles/top-categories.scss";
import Button from '@mui/material/Button';
import Flickity from 'react-flickity-component';
import imageSample from "../assets/images/image.png";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Link } from '@mui/material';
import { callAPI } from "./api-call";
import { hostUrl } from "../host-url";

function TopCategories() {
    const [categories, setcategories] = useState();
    useEffect(async () => {
        const data = new FormData();
        data.append("hotest", "true");
        data.append("favorites", "true");
        data.append("latest", "true");
        callAPI({ method: 'POST', url: `https://api.ludushub.io/explore`, data: data }).then(response => {
            setcategories(response.payload.data.latest[0]);
        });
    }, []);
    const flickityRef = useRef();
    function handleGotoNextSlide() {
        flickityRef.current.next();
    }
    function handleGotoPrevSlide() {
        flickityRef.current.previous();
    }
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
                            <div style={{ color: '#CDBDFF', display: 'flex', justifyContent: 'center', fontSize: 'small', textAlign: 'center' }}>{item.Description}</div>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        );
    }
    return (
        <div className="top-categories">
            <span className="title">دسته بندی‌های برتر</span>
            <div className="categories-container overflow-hidden">
                <Flickity options={flickityOptions} flickityRef={ref => flickityRef.current = ref}>
                    {categories && categories.length > 0 &&
                        categories.map((collection, index) => {
                            return (getCard(collection, 'collection'));
                        })
                    }
                </Flickity>
                <div className="buttons">
                    <Button classes={{ root: 'btn' }} onClick={handleGotoPrevSlide}><ArrowForwardIosRoundedIcon /></Button>
                    <Button classes={{ root: 'btn' }} onClick={handleGotoNextSlide}><ArrowBackIosRoundedIcon /></Button>
                </div>
            </div>
        </div>
    );
}
const flickityOptions = {
    pageDots: false,
    rightToLeft: true,
    draggable: true,
    prevNextButtons: false,
    contain: true,
    groupCells: window.innerWidth < 768 ? 1 : 4,
    freeScroll: false,
    cellAlign: 'center',
    wrapAround: true
};
export default TopCategories;