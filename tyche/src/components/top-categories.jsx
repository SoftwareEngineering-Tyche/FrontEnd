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
import "../assets/styles/cards.scss";

function TopCategories() {
    const [categories, setcategories] = useState();
    useEffect(async () => {
        const data = new FormData();
        data.append("hotest", "true");
        data.append("favorites", "true");
        data.append("latest", "true");
        callAPI({ method: 'POST', url: `${hostUrl}/explore`, data: data }).then(response => {
            setcategories(response.payload.data.latest[0].concat(response.payload.data.favorites[0], response.payload.data.hotest[0]));
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
            <Link style={{ margin: '4px' }} className="item-card" underline="none" href={mode === 'product' ? `/product/${item.id}` : `/collection/${item.id}`}>
                {mode === 'product' ? <img src={hostUrl + item.image} className="square-img" /> : <img src={hostUrl + item.logoimage} className="round-img" />}
                <div className="item-name">{item.Name}</div>
                <div className="item-description">{item.Description}</div>
            </Link>
        );
    }
    return (
        <div className="top-categories">
            <span className="title">دسته بندی‌های برتر</span>
            <div className="categories-container overflow-hidden">
                <Flickity options={flickityOptions} flickityRef={ref => flickityRef.current = ref}>
                    {categories && categories.length > 0 &&
                        categories.map((collection, index) => {
                            return (
                                getCard(collection, 'collection')
                            );
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