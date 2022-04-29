import React, { useRef } from "react";
import "../assets/styles/top-categories.scss";
import Button from '@mui/material/Button';
import Flickity from 'react-flickity-component';
import imageSample from "../assets/images/image.png";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

function NftCarousel (props) {
    const flickityRef = useRef();
    function handleGotoNextSlide() {
        flickityRef.current.next();
    }
    function handleGotoPrevSlide() {
        flickityRef.current.previous();
    }
    function getCards() {
        return (
            <Card sx={{ height:220, borderRadius:'16px', overflow:'unset', margin:'3px', display:'flex', justifyContent:'center', alignItems:'center' }}>
                <CardActionArea sx={{width:'200px'}}>
                    <CardMedia sx={{display:'flex', justifyContent:'center', padding:'0px', margin:'0px'}}><img src={imageSample} height={150} width={150}/></CardMedia>
                    <CardContent sx={{padding:'6px 16px'}}>
                        <div style={{color:'#2F3A8F'}}>نام اثر</div>
                        <div style={{color:'#CDBDFF', fontSize:'small'}}>توضیحات اثر</div>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
    return (
        <div className="top-categories">
            <span className="title">{props.title}</span>
            <div className="categories-container">
                <Flickity options={flickityOptions} flickityRef={ref => flickityRef.current = ref}>
                    {getCards()}
                    {getCards()}
                    {getCards()}
                    {getCards()}
                    {getCards()}
                    {getCards()}
                    {getCards()}
                </Flickity>
                <div className="buttons">
                    <Button classes={{root:'btn'}} onClick={handleGotoPrevSlide}><ArrowForwardIosRoundedIcon/></Button>
                    <Button classes={{root:'btn'}} onClick={handleGotoNextSlide}><ArrowBackIosRoundedIcon/></Button>
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
    groupCells: window.innerWidth < 768 ? 2 : 5,
    freeScroll: false,
    cellAlign: 'center',
    wrapAround: true
};
export default NftCarousel;