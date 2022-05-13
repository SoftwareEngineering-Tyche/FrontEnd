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

function NftCarousel(props) {
    const flickityRef = useRef();
    const [collection, setCollection] = useState();
    function handleGotoNextSlide() {
        flickityRef.current.next();
    }
    function handleGotoPrevSlide() {
        flickityRef.current.previous();
    }
    function getCard(product) {
        return (
            <Card sx={{ height: 220, borderRadius: '16px', overflow: 'unset', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link href={`/product/${product.id}`} underline="none">
                    <CardActionArea sx={{ width: '200px' }}>
                        <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia sx={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px' }}><img src={hostUrl + product.image} width={150} height={150}/></CardMedia>
                        </div>
                        <CardContent sx={{ padding: '6px 16px' }}>
                            <div style={{ color: '#2F3A8F', display: 'flex', justifyContent: 'center' }}>{product.Name}</div>
                            <div style={{ color: '#CDBDFF', display: 'flex', justifyContent: 'center', fontSize: 'small' }}>{product.Description}</div>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
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
                        return (getCard(product));
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