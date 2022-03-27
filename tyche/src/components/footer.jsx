import React, { useRef } from "react";
import "../assets/styles/footer.scss";
import Button from '@mui/material/Button';
import walletIcon from '../assets/images/wallet.svg';
import collectionsIcon from '../assets/images/collection.svg';
import nftIcon from '../assets/images/nft.svg';
import saleIcon from '../assets/images/sale.svg';

function Footer () {
    
    return (
        <div className="footer">
            <div className="options">
                <div className="option">
                    <img src={walletIcon} className="icon"/>
                    <span>کیف پولت را داشته باش</span>
                </div>
                <div className="option">
                    <img src={collectionsIcon} className="icon"/>
                    <span>کیف پولت را داشته باش</span>
                </div>
                <div className="option">
                    <img src={nftIcon} className="icon"/>
                    <span>کیف پولت را داشته باش</span>
                </div>
                <div className="option">
                    <img src={saleIcon} className="icon"/>
                    <span>کیف پولت را داشته باش</span>
                </div>
            </div>
        </div>
    );
}
export default Footer;