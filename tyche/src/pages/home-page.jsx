import React from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/home-page.scss";
import slide1 from "../assets/images/ezgif 1.svg";
import slide2 from "../assets/images/ezgif3.svg";
import slide3 from "../assets/images/ezgif2.svg";
import slide4 from "../assets/images/ezgif4.svg";
import slide5 from "../assets/images/ezgif5.svg";
import Button from '@mui/material/Button';
import Flickity from 'react-flickity-component';
import TopCategories from "../components/top-categories";
import HomePageDescriptions from "../components/descriptions";
import { useMoralis, MoralisProvider } from "react-moralis";
import Moralis from "moralis";

function HomePage () {
	const { authenticate, isAuthenticated } = useMoralis();
    return (
        <div className="home-page">
            <div className="landing-container">
                <div className="info-box">
                    <span className="title">
                        مالکیت دیجیتال آثار مورد علاقه خود را به راحتی پیدا کنید!
                    </span>
                    <span className="subtitle">
                        نخستین پلتفرم ایرانی خرید و فروش NFT
                    </span>
                    <div className="btn-container">
                        <Link to="/explore" className="link">
                        <Button className="primary-btn">
                            شروع خرید
                        </Button>
                        </Link>
                        <Link to="/nft" className="link">
                            <Button className="secondary-btn" onClick={authenticate}>
                                ساخت NFT
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="image-container">
                    <div className="image-slider">
                        <Flickity options={flickityOptions}>
                            <img src={slide1} width={320} />
                            <img src={slide2} width={320} />
                            <img src={slide3} width={320} />
                            <img src={slide4} width={320} />
                            <img src={slide5} width={320} />
                        </Flickity>
                    </div>
                </div>
            </div>
            <TopCategories/>
            <HomePageDescriptions/>
        </div>
    );
}
const flickityOptions = {
    pageDots: false,
    draggable: true,
    prevNextButtons: false,
    contain: true,
    freeScroll: false,
    cellAlign: 'center',
    autoPlay: 2000,
    wrapAround: true,
    pauseAutoPlayOnHover: false
}
export default HomePage;