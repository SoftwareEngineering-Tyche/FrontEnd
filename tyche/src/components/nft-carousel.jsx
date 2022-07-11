import React, { useRef, useEffect, useState } from "react";
import "../assets/styles/top-categories.scss";
import Button from '@mui/material/Button';
import Flickity from 'react-flickity-component';
import imageSample from "../assets/images/image.png";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Card, CardActionArea, CardContent, CardMedia, Link } from '@mui/material';
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";
import "../assets/styles/cards.scss";

function NftCarousel(props) {
    const flickityRef = useRef();
    const [collection, setCollection] = useState();
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
    useEffect(() => {
        if (props.product) {
            callAPI({ method: "GET", url: `${hostUrl}/WorkArtCollection/${props.product}` }).then(response => {
                setCollection(response.payload);
            });
        }
    }, []);
    return (
        <div className="top-categories">
            <span className="title">{props.title}</span>
            <div className="categories-container d-flex">
                {collection &&
                    collection.map((product, index) => {
                        return (getCard(product, 'product'));
                    })
                }
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
    groupCells: window.innerWidth < 768 ? 2 : 5,
    freeScroll: false,
    cellAlign: 'right',
    wrapAround: true
};
export default NftCarousel;